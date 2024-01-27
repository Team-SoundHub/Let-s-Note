package com.geeks.letsnote.domain.account.api;

import com.geeks.letsnote.domain.account.application.MemberFacadeService;
import com.geeks.letsnote.domain.account.dto.RequestMemberFacade;
import com.geeks.letsnote.domain.account.dto.ResponseMemberFacade;
import com.geeks.letsnote.global.security.dto.CommonResponse;
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