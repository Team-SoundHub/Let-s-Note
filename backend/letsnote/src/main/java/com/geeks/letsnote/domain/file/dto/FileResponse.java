package com.geeks.letsnote.domain.file.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

public record FileResponse() {
    @Builder
    public record Information(
            @NotNull
            @Size(max=300)
            String fileUrl,

            @NotNull
            @Size(max = 30)
            String fileName
    ){
    }
}
