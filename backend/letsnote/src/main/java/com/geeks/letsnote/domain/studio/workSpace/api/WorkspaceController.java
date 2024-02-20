package com.geeks.letsnote.domain.studio.workSpace.api;


import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteInstrumentMapService;
import com.geeks.letsnote.domain.message.dto.MessageResponse;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteService;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseWorkspaces;
import com.geeks.letsnote.global.network.dto.SocketRequest;
import com.geeks.letsnote.global.network.dto.SocketResponse;
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
    private final AccountService accountService;

    public WorkspaceController(WorkspaceService workspaceService, NoteInstrumentMapService noteInstrumentMapService, NoteService noteService, AccountService accountService) {
        this.workspaceService = workspaceService;
        this.noteInstrumentMapService = noteInstrumentMapService;
        this.noteService = noteService;
        this.accountService = accountService;
    }

    @Operation(summary = "모든 워크스페이스 출력", description = "AccountId에 해당하는 모든 메세지를 리턴합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = ResponseWorkspaces.WorkspaceDto.class)))
    })
    @GetMapping("/{accountId}")
    public ResponseEntity<CommonResponse> getAllWorkspaces(@PathVariable("accountId") Long accountId){
        boolean checkUser = accountService.checkPathVariableWithTokenUser(accountId);
        if(!checkUser){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
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
        boolean checkUser = accountService.checkPathVariableWithTokenUser(accountId);
        if(!checkUser){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        ResponseWorkspaces.WorkspaceId postWorkspaceId = workspaceService.createWorkspace(workspaceDto,accountId);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(postWorkspaceId)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/space-id")
    public ResponseEntity<CommonResponse> getAllNote(@RequestParam("v") String spaceId){
        ResponseWorkspaces.WorkspaceIn allNotes = workspaceService.getAllNotesOfWorkspace(spaceId);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(allNotes)
                .build();

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

//    @PostMapping("/space-id")
//    public ResponseEntity<CommonResponse> clickNote(@RequestParam("v") String spaceId, @RequestBody RequestNotes.NoteDto note){
//        noteInstrumentMapService.clickNoteMap(spaceId,note);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @DeleteMapping("/test")
    public ResponseEntity<CommonResponse> deleteAllWorkspacesForDBClean(){
        workspaceService.deleteAllWorkspaces();

        return new ResponseEntity<>(HttpStatus.OK);
    }

//    @DeleteMapping("/test-inst")
//    public ResponseEntity<CommonResponse> deleteAllInstrumentBySpaceId(@RequestBody SocketRequest.SpaceInstrument spaceInstrument){
//        noteInstrumentMapService.deleteNoteBySpaceIdAndInstrument(spaceInstrument);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @GetMapping("/nickname/space-id")
    public ResponseEntity<CommonResponse> getMembersNickname(@RequestParam("v") String spaceId){
        ResponseWorkspaces.WorkspaceMembers members = workspaceService.getMemberNicknamesFromSpaceId(spaceId);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(members)
                .build();

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/member/space-id")
    public ResponseEntity<CommonResponse> addMember(@RequestParam("v") String spaceId,@RequestBody RequestWorkspaces.AddUserId userId){
        ResponseWorkspaces.MemberNickname nickname = workspaceService.addMemberOfWorkspace(userId.userId(),spaceId);
        if(nickname == null){
            CommonResponse responseError = CommonResponse.builder()
                    .success(false)
                    .response("Not Found id : " + userId.userId())
                    .build();

            return new ResponseEntity<>(responseError,HttpStatus.NOT_FOUND);
        }
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(nickname)
                .build();

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/loop/{spaceId}")
    public ResponseEntity<CommonResponse> makeLoopTest(@PathVariable("spaceId") String spaceId, @RequestBody SocketRequest.LoopStatus loopStatus){
        SocketResponse.LoopNotes loopNotes = workspaceService.makeLoop(loopStatus,spaceId);
        if(loopNotes == null){
            CommonResponse commonResponse = CommonResponse.builder()
                    .success(true)
                    .response("nothing changed")
                    .build();
            return new ResponseEntity<>(commonResponse,HttpStatus.OK);
        }
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(loopNotes)
                .build();
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @DeleteMapping("/space-id")
    public ResponseEntity<CommonResponse> deleteWorkspace(@RequestParam("v") String spaceId){
        workspaceService.deleteWorkspaceById(spaceId);

        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response("delete success")
                .build();

        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
