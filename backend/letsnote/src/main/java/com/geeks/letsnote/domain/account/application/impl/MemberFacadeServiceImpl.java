package com.geeks.letsnote.domain.account.application.impl;

import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.account.application.MemberFacadeService;
import com.geeks.letsnote.domain.account.dto.RequestAccount;
import com.geeks.letsnote.domain.account.dto.RequestMemberFacade;
import com.geeks.letsnote.domain.account.dto.ResponseAccount;
import com.geeks.letsnote.domain.account.dto.ResponseMemberFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MemberFacadeServiceImpl implements MemberFacadeService {

    private final AccountService accountService;

    @Override
    public ResponseMemberFacade.Information signup(RequestMemberFacade.Register registerDto) {
        ResponseAccount.Information response = accountService.registerMember(RequestAccount.RegisterMember.builder()
                        .nickname(registerDto.nickname())
                        .username(registerDto.username())
                        .password(registerDto.password())
                .build());

        return ResponseMemberFacade.Information.builder()
                .authoritySet(response.authoritySet())
                .nickname(response.nickname())
                .tokenWeight(response.tokenWeight())
                .password(response.password())
                .username(response.username())
                .build();
    }
}