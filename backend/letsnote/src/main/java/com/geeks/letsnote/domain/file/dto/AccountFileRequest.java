package com.geeks.letsnote.domain.file.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;

public record AccountFileRequest() {
    @Builder
    public record AccountFile(
            @NotNull
            MultipartFile file,

            @NotNull
            @Size(max = 50)
            Long accountId
    ){

    }

    @Builder
    public record AccountId(
            @NotNull
            Long accountId
    ){

    }

}
