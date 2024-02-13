package com.geeks.letsnote.global.infrastructure.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

public record AIModelRequest() {
    @Builder
    public record BasicRequest(
            String username,
            @NotNull
            String text
    ){
    }
}
