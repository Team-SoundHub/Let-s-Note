package com.geeks.letsnote.global.network.dto;

import lombok.Builder;

public record WebRTCResponse() {
    @Builder
    public record Offer(
            String type,
            String sdp
    ){}
}
