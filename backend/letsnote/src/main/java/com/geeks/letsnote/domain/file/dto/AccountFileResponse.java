package com.geeks.letsnote.domain.file.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.sql.Timestamp;

public record AccountFileResponse() {
    @Builder
    public record Information(
            @NotNull
            @Size(max=300)
            String fileUrl,

            @NotNull
            Long accountId,
            @NotNull
            Timestamp regDate
    ){
    }
}
