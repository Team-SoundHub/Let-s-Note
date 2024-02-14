package com.geeks.letsnote.global.infrastructure.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

public record AIModelRequest() {
    @Builder
    public record BasicRequest(
            String username,
            @NotNull
            String text,
            @NotNull
            Integer value,
            List<Integer> previous
    ){
    }
}
