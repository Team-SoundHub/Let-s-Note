package com.geeks.letsnote.global.infrastructure;

import lombok.Builder;

public record AIModelRequest() {
    @Builder
    public record BasicRequest(
            String username,
            String text
    ){
    }
}
