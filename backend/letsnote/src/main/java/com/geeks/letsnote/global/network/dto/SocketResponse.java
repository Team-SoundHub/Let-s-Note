package com.geeks.letsnote.global.network.dto;

import com.geeks.letsnote.domain.account.dto.ResponseAccount;
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

    @Builder
    public record chat(
            @NotNull
            Long accountId,
            @NotNull
            String msgContent,
            @NotNull
            String nickName
    ){
    }
}
