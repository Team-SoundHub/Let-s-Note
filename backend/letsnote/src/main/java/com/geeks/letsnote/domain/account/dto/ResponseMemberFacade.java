package com.geeks.letsnote.domain.account.dto;

import lombok.Builder;

import java.util.Set;

public record ResponseMemberFacade() {
    @Builder
    public record Information(
            String username,
            String password,
            String nickname,
            Long tokenWeight,
            Set<String> authoritySet
    ) {
    }
}
