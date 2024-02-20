package com.geeks.letsnote.domain.message.dto;

import lombok.Builder;

import java.sql.Timestamp;

public record MessageResponse() {
    @Builder
    public record information(
            Long accountId,
            String msgContent,
            Timestamp timestamp
    ){
    }
}
