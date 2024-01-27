package com.geeks.letsnote.domain.account.application.impl;


import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.account.application.AdminFacadeService;
import com.geeks.letsnote.domain.account.dto.RequestAccount;
import com.geeks.letsnote.domain.account.dto.RequestAdminFacade;
import com.geeks.letsnote.domain.account.dto.ResponseAccount;
import com.geeks.letsnote.domain.account.dto.ResponseAdminFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
public class AdminFacadeServiceImpl implements AdminFacadeService {

    private final AccountService accountService;

    @Transactional
    @Override
    public ResponseAdminFacade.Information signup(RequestAdminFacade.Register registerDto) {
        ResponseAccount.Information response = accountService.registerAdmin(RequestAccount.RegisterAdmin.builder()
                        .nickname(registerDto.nickname())
                        .password(registerDto.password())
                        .username(registerDto.username())
                .build());

        return ResponseAdminFacade.Information.builder()
                .authoritySet(response.authoritySet())
                .nickname(response.nickname())
                .tokenWeight(response.tokenWeight())
                .password(response.password())
                .username(response.username())
                .build();
    }
}
