package com.geeks.letsnote.domain.account.api;

import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.account.dto.RequestAccount;
import com.geeks.letsnote.domain.account.dto.ResponseAccount;
import com.geeks.letsnote.domain.account.exception.RefreshTokenValidationException;
import com.geeks.letsnote.global.security.config.CustomJwtFilter;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController
{
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/token")
    public ResponseEntity<CommonResponse> authorize(@Valid @RequestBody RequestAccount.Login loginDto) {
        ResponseAccount.Token token = accountService.authenticate(loginDto.username(), loginDto.password());

        accountService.UpdateAccountRefreshToken(loginDto.username(), token.refreshToken());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(CustomJwtFilter.AUTHORIZATION_HEADER, "Bearer " + token.accessToken());

        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(token)
                .build();

        return new ResponseEntity<>(response, httpHeaders, HttpStatus.OK);
    }

    @PutMapping("/token")
    public ResponseEntity<CommonResponse> refreshToken(@Valid @RequestBody RequestAccount.Refresh refreshDto) {

        if(accountService.refreshTokenValidationCheck(refreshDto.token())){
            ResponseAccount.Token token = accountService.refreshToken(refreshDto.token());

            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(CustomJwtFilter.AUTHORIZATION_HEADER, "Bearer " + token.accessToken());

            CommonResponse response = CommonResponse.builder()
                    .success(true)
                    .response(token)
                    .build();

            return new ResponseEntity<>(response, httpHeaders, HttpStatus.OK);
        } else {
            throw new RefreshTokenValidationException("Token validation failed");
        }
    }

    @DeleteMapping("/{username}/token")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<CommonResponse> authorize(@PathVariable(name = "username") String username) {
        accountService.invalidateRefreshTokenByUsername(username);

        CommonResponse response = CommonResponse.builder()
                .success(true)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}