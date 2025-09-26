// src/main/java/com/example/meesho/dto/AskRequest.java
package com.example.meesho.dto;

import java.util.List;

public class AskRequest {
    private List<String> reviews;
    private String question;

    // Getters and Setters
    public List<String> getReviews() {
        return reviews;
    }
    public void setReviews(List<String> reviews) {
        this.reviews = reviews;
    }
    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
}
