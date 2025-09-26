// src/main/java/com/example/meesho/dto/AskResponse.java
package com.example.meesho.dto;

public class AskResponse {
    private String answer;

    public AskResponse(String answer) {
        this.answer = answer;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
