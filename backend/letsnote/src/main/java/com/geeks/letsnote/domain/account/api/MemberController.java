package com.geeks.letsnote.domain.account.api;

import com.geeks.letsnote.domain.account.application.MemberFacadeService;
import com.geeks.letsnote.domain.account.dto.RequestMemberFacade;
import com.geeks.letsnote.domain.account.dto.ResponseMemberFacade;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/members")
public class MemberController {
    private final MemberFacadeService memberFacadeService;

    public MemberController(MemberFacadeService memberFacadeService) {
        this.memberFacadeService = memberFacadeService;
    }
    
    @Operation(summary = "맴버 회원가입", description = "맴버 권한을 가진 계정의 회원가입 입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "401", description = "UNAUTHORIZED"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @PostMapping("/signup")
    public ResponseEntity<CommonResponse> signup(
            @Valid @RequestBody RequestMemberFacade.Register registerDto
    ) {
        ResponseMemberFacade.Information userInfo = memberFacadeService.signup(registerDto);

        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(userInfo)
                .build();
        return ResponseEntity.ok(response);
    }
}