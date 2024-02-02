package com.geeks.letsnote.domain.file.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record FileRequest(){
    public record File(
            @NotNull
            @Size(max=300)
            String fileUrl,

            @NotNull
            @Size(max = 50)
            String accountId
    ){
    }
}