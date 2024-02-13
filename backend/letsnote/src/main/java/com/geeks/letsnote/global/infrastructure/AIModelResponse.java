package com.geeks.letsnote.global.infrastructure;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

public record AIModelResponse() {
    @Builder
    public record Note(
            @NotNull
            List<String> noteList
    ){
    }
}
