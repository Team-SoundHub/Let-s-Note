package com.geeks.letsnote.domain.account.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

public record RequestAdminFacade() {
    @Builder
    public record Register(
            @NotNull
            @Size(min = 3, max = 50)
            String username,

            @NotNull
            @Size(min = 5, max = 100)
            String password,

            @NotNull
            @Size(min = 2, max = 100)
            String nickname
    ) {
    }
}
