package com.geeks.letsnote.domain.studio.workSpace.api;

import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseWorkspaces;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/workspaces")
public class WorkspaceController {
    private final WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<CommonResponse> getAllWorkspaces(@PathVariable("accountId") Long accountId){
        List<ResponseWorkspaces.WorkspaceDto> getWorkspaces = workspaceService.getAllWorkspacesByOwnerId(accountId);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(getWorkspaces)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/{accountId}")
    public ResponseEntity<CommonResponse> postWorkspace(@PathVariable("accountId") Long accountId, @RequestBody RequestWorkspaces.WorkspaceDto workspaceDto){
        ResponseWorkspaces.WorkspaceId postWorkspaceId = workspaceService.createWorkspace(workspaceDto,accountId);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(postWorkspaceId)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
