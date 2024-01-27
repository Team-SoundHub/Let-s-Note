package com.geeks.letsnote.global.network.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

public record SocketResponse() {
    @Builder
    public record content(
            @NotNull
            String instrument,
            @NotNull
            Integer x,
            @NotNull
            Integer y
    ){
    }
}
