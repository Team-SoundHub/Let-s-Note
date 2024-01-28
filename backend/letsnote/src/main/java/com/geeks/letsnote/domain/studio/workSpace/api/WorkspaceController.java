package com.geeks.letsnote.domain.studio.workSpace.api;


import com.geeks.letsnote.domain.studio.workSpace.application.NoteInstrumentMapService;
import com.geeks.letsnote.domain.message.dto.MessageResponse;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteService;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseWorkspaces;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "워크스페이스 API", description = "워크스페이스 관련 API 입니다.")
@RestController
@RequestMapping("/api/v1/workspaces")
public class WorkspaceController {
    private final WorkspaceService workspaceService;
    private final NoteInstrumentMapService noteInstrumentMapService;
    private final NoteService noteService;

    public WorkspaceController(WorkspaceService workspaceService, NoteInstrumentMapService noteInstrumentMapService, NoteService noteService) {
        this.workspaceService = workspaceService;
        this.noteInstrumentMapService = noteInstrumentMapService;
        this.noteService = noteService;
    }

    @Operation(summary = "모든 워크스페이스 출력", description = "AccountId에 해당하는 모든 메세지를 리턴합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResponseWorkspaces.WorkspaceDto.class)))
    })
    @GetMapping("/{accountId}")
    public ResponseEntity<CommonResponse> getAllWorkspaces(@PathVariable("accountId") Long accountId){
        List<ResponseWorkspaces.WorkspaceDto> getWorkspaces = workspaceService.getAllWorkspacesByOwnerId(accountId);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(getWorkspaces)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "모든 워크스페이스 출력", description = "AccountId에 해당하는 모든 메세지를 리턴합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = MessageResponse.information.class)))
    })
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

    @DeleteMapping("/test")
    public ResponseEntity<CommonResponse> deleteAllWorkspacesForDBClean(){
        workspaceService.deleteAllWorkspaces();

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
