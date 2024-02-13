package com.geeks.letsnote.global.network.dto;

import lombok.Builder;

public record WebRTCRequest() {

    @Builder
    public record Offer (
            String offer
    ) {}
}
