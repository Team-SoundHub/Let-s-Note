package com.geeks.letsnote.domain.account.api;

import com.geeks.letsnote.domain.account.application.AdminFacadeService;
import com.geeks.letsnote.domain.account.dto.RequestAdminFacade;
import com.geeks.letsnote.domain.account.dto.ResponseAdminFacade;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admins")
public class AdminController {
    private final AdminFacadeService adminFacadeService;

    public AdminController(AdminFacadeService adminFacadeService) {
        this.adminFacadeService = adminFacadeService;
    }

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
