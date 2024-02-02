package com.geeks.letsnote.global.network.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import java.sql.Timestamp;

public record SocketResponse() {
    @Builder
    public record Coordinate(
            @NotNull
            String spaceId,
            @NotNull
            String instrument,
            @NotNull
            Integer x,
            @NotNull
            Integer y
    ){
    }

    @Builder
    public record Chat(
            @NotNull
            String spaceId,
            @NotNull
            String nickname,
            @NotNull
            String msgContent,
            @NotNull
            Timestamp timeStamp
    ){
    }

    @Builder
    public record WorkSpace(
            @NotNull
            String space_id
    ){
    }

    @Builder
    public record MousePosition(
            Integer x,
            Integer y,
            Long accountId,
            String spaceId
    ) {
    }
}
