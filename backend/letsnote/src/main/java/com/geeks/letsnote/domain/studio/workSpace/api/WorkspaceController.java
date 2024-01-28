package com.geeks.letsnote.domain.studio.workSpace.api;

import com.geeks.letsnote.domain.studio.workSpace.application.NoteInstrumentMapService;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
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
    private final NoteInstrumentMapService noteInstrumentMapService;

    public WorkspaceController(WorkspaceService workspaceService, NoteInstrumentMapService noteInstrumentMapService) {
        this.workspaceService = workspaceService;
        this.noteInstrumentMapService = noteInstrumentMapService;
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

    @GetMapping("/space-id")
    public ResponseEntity<CommonResponse> getAllNote(@RequestParam("v") String spaceId){
        List<ResponseNotes.Notes> allNotes = workspaceService.getAllNoteOfWorkspace(spaceId);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(allNotes)
                .build();

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/space-id")
    public ResponseEntity<CommonResponse> clickNote(@RequestParam("v") String spaceId, @RequestBody RequestNotes.NoteDto note){
        noteInstrumentMapService.clickOnNote(spaceId,note);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
