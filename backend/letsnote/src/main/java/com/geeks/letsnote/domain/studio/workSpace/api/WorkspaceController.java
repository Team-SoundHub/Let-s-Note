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
@RequestMapping("/workspaces")
public class WorkspaceController {
    private final WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @GetMapping("")
    public ResponseEntity<CommonResponse> getAllWorkspaces(@RequestBody String userName){
        List<ResponseWorkspaces.WorkspaceDto> getWorkspaces = workspaceService.getAllWorkspacesByUserName(userName);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(getWorkspaces)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<CommonResponse> postWorkspace(@RequestBody RequestWorkspaces.WorkspaceDto workspaceDto){
        String postWorkspaceId = workspaceService.createWorkspace(workspaceDto);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(postWorkspaceId)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
