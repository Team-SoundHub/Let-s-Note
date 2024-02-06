package com.geeks.letsnote.domain.file.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;

public record FileRequest(){
    @Builder
    public record Information(
            @NotNull
            @Size(max=300)
            String fileUrl,

            @NotNull
            @Size(max = 50)
            String spaceId,

            @NotNull
            @Size(max = 30)
            String fileName
    ){
    }

    @Builder
    public record AccontFile(
            @NotNull
            MultipartFile file,

            @NotNull
            @Size(max = 50)
            Long accountId
    ){

    }

}