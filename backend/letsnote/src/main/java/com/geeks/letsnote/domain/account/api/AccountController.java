package com.geeks.letsnote.domain.account.api;

import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.account.dto.RequestAccount;
import com.geeks.letsnote.domain.account.dto.ResponseAccount;
import com.geeks.letsnote.domain.account.exception.RefreshTokenValidationException;
import com.geeks.letsnote.global.security.config.CustomJwtFilter;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Tag(name = "계정 API", description = "계정 관련 API 입니다.")
@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController
{
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }


    @Operation(summary = "토큰 발급", description = "Access Token, Refresh Token을 ResponseBody에 담아 리턴합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
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


    @Operation(summary = "액세스토큰 재발급", description = "Access Token을 ResponseBody에 담아 리턴합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
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

    @Operation(summary = "토큰 삭제", description = "사용자 이름을 URL 파라미터값으로 받아 Refresh Token의 가중치를 변경시는 방식으로 삭제처리 합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
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