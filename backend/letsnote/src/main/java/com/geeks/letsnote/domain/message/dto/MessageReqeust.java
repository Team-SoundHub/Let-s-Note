package com.geeks.letsnote.domain.message.dto;

import lombok.Builder;

import java.sql.Timestamp;

public record MessageReqeust() {
    @Builder
    public record information(
            Long accountId,
            String msgContent,
            String spaceId,
            Timestamp timestamp
    ){
    }
}
