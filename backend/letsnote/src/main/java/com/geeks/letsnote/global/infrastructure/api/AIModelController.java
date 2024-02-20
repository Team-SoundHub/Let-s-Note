package com.geeks.letsnote.global.infrastructure.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.geeks.letsnote.global.infrastructure.application.AIModelService;
import com.geeks.letsnote.global.infrastructure.dto.AIModelRequest;
import com.geeks.letsnote.global.infrastructure.dto.AIModelResponse;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "AI API", description = "AI 관련 API 입니다.")
@RestController
@RequestMapping("/api/v1/ai")
public class AIModelController {
    private final AIModelService aiModelService;

    public AIModelController(AIModelService aiModelService) {
        this.aiModelService = aiModelService;
    }

    @PostMapping("/genre/{username}")
    public ResponseEntity<CommonResponse> callGenreAI(@PathVariable String username, @RequestBody AIModelRequest.BasicRequest basicRequest) throws JsonProcessingException {
        AIModelResponse.Note result = aiModelService.requestToGenreAPI(basicRequest);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(result)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/chord/{username}")
    public ResponseEntity<CommonResponse> callChordAI(@PathVariable String username, @RequestBody AIModelRequest.BasicRequest basicRequest) throws JsonProcessingException {
        AIModelResponse.Note result = aiModelService.requestToChordAPI(basicRequest);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(result)
                .build();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}