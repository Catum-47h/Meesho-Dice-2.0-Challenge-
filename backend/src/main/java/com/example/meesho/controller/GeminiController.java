// src/main/java/com/example/meesho/controller/GeminiController.java
package com.example.meesho.controller;

import com.example.meesho.dto.AskRequest;
import com.example.meesho.dto.AskResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/ask")
@CrossOrigin(origins = "http://localhost:3000")
public class GeminiController {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @PostMapping
    public AskResponse askGemini(@RequestBody AskRequest request) {
        RestTemplate restTemplate = new RestTemplate();

        // Combine reviews and question
        StringBuilder promptBuilder = new StringBuilder("Here are some reviews:\n");
        request.getReviews().forEach(r -> promptBuilder.append(r).append("\n"));
        promptBuilder.append("\nUser asks: ").append(request.getQuestion());

        // Prepare request body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", new Object[]{
                Map.of("parts", new Object[]{Map.of("text", promptBuilder.toString())})
        });

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("X-Goog-Api-Key", geminiApiKey);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        // Call Gemini API
        Map response = restTemplate.postForObject(geminiApiUrl, entity, Map.class);

        String answer = "";

        try {
            // Safe extraction of text
            java.util.List candidates = (java.util.List) response.get("candidates");
            if (candidates != null && !candidates.isEmpty()) {
                Map firstCandidate = (Map) candidates.get(0);
                Map content = (Map) firstCandidate.get("content");
                java.util.List parts = (java.util.List) content.get("parts");
                if (parts != null && !parts.isEmpty()) {
                    Map firstPart = (Map) parts.get(0);
                    answer = (String) firstPart.get("text");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            answer = "Could not generate answer.";
        }

        return new AskResponse(answer);
    }
}