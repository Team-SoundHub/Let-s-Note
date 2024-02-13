package com.geeks.letsnote.global.infrastructure.application;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.geeks.letsnote.global.infrastructure.dto.AIModelRequest;
import com.geeks.letsnote.global.infrastructure.dto.AIModelResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class AIModelService {

    @Value("${ai-server.baseUrl}")
    private String baseUrl;

    public AIModelResponse.Note sendRequestToAPI(AIModelRequest.BasicRequest basicRequest) throws JsonProcessingException {
        String url = baseUrl + "/api/v1/" + basicRequest.username();

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        ObjectMapper objectMapper = new ObjectMapper();

        headers.setContentType(MediaType.APPLICATION_JSON);
        String requestBody = objectMapper.writeValueAsString(basicRequest);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        List<String> noteList = objectMapper.readValue(response.getBody(), new TypeReference<List<String>>() {});

        return new AIModelResponse.Note(noteList);
    }
}
