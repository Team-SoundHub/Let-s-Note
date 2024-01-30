package com.geeks.letsnote.domain.account.dto;

import com.geeks.letsnote.domain.account.entity.Account;
import com.geeks.letsnote.domain.account.entity.Authority;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.Set;
import java.util.stream.Collectors;

public record ResponseAccount() {
    @Builder
    public record Token(
            String accessToken,
            String refreshToken,
            Long accountId
    ) {
    }

    @Builder
    public record Refresh(
            @NotNull
            String token
    ) {
    }

    @Builder
    public record Information(
            String username,
            String password,
            String nickname,
            Long tokenWeight,
            Set<String> authoritySet
    ) {

        public static Information of(Account account) {
            if(account == null) return null;

            return Information.builder()
                    .username(account.getUsername())
                    .password(account.getPassword())
                    .nickname(account.getNickname())
                    .tokenWeight(account.getTokenWeight())
                    .authoritySet(account.getAuthorities().stream()
                            .map(Authority::getAuthorityName)
                            .collect(Collectors.toSet()))
                    .build();
        }
    }
    @Builder
    public record NickName(
            @NotNull
            String nickname
    ){
    }

    @Builder
    public record AccountId(
            @NotNull
            Long accountId
    ){
    }

}