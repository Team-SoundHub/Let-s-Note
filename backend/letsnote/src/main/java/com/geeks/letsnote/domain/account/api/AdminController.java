package com.geeks.letsnote.domain.account.api;

import com.geeks.letsnote.domain.account.application.AdminFacadeService;
import com.geeks.letsnote.domain.account.dto.RequestAdminFacade;
import com.geeks.letsnote.domain.account.dto.ResponseAdminFacade;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "어드민 API", description = "어드민 관련 API 입니다.")
@RestController
@RequestMapping("/api/v1/admins")
public class AdminController {
    private final AdminFacadeService adminFacadeService;

    public AdminController(AdminFacadeService adminFacadeService) {
        this.adminFacadeService = adminFacadeService;
    }

    @Operation(summary = "어드민 회원가입", description = "어드민 권한을 가진 계정의 회원가입 입니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResponseAdminFacade.Information.class)))
    })
    @PostMapping("/signup")
    public ResponseEntity<CommonResponse> signup(
            @Valid @RequestBody RequestAdminFacade.Register registerDto
    ) {
        ResponseAdminFacade.Information userInfo = adminFacadeService.signup(registerDto);

        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(userInfo)
                .build();
        return ResponseEntity.ok(response);
    }
}
