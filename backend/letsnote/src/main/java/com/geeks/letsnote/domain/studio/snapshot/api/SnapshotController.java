package com.geeks.letsnote.domain.studio.snapshot.api;

import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotService;
import com.geeks.letsnote.domain.studio.snapshot.dto.RequestSnapshot;
import com.geeks.letsnote.domain.studio.snapshot.dto.ResponseSnapshot;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/snapshots")
public class SnapshotController {
    private final SnapshotService snapshotService;
    private final AccountService accountService;
    private final WorkspaceService workspaceService;

    public SnapshotController(SnapshotService snapshotService, AccountService accountService, WorkspaceService workspaceService) {
        this.snapshotService = snapshotService;
        this.accountService = accountService;
        this.workspaceService = workspaceService;
    }

    @PostMapping("/space-id")
    public ResponseEntity<CommonResponse> postSnapshot(@RequestParam("v") String spaceId,
                                                       @RequestBody RequestSnapshot.SnapshotDto snapshotDto) {
        boolean checkMaxCountSnapshot = workspaceService.checkMaxCountSnapshot(spaceId);

        if(!checkMaxCountSnapshot){
            CommonResponse response = CommonResponse.builder()
                    .success(false)
                    .response("Max snapshot Count")
                    .build();
            return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
        }
        ResponseSnapshot.SnapshotId snapshotId = snapshotService.createSnapshot(spaceId , snapshotDto);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(snapshotId)
                .build();

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<CommonResponse> getSnapshotsOfAccount(@PathVariable("accountId") Long accountId){
        boolean checkUser = accountService.checkPathVariableWithTokenUser(accountId);
        if(!checkUser){
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        List<ResponseSnapshot.SnapshotDto> snapshotDtoList = snapshotService.getAllSnapshotsByAccountId(accountId);

        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(snapshotDtoList)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/snapshot-id")
    public ResponseEntity<CommonResponse> getAllNoteOfSnapshot(@RequestParam("v") String snapshotId){
        List<ResponseNotes.Notes> snapshotNotes = snapshotService.getAllNotesOfSnapshot(snapshotId);

        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(snapshotNotes)
                .build();

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @DeleteMapping("/snapshot-id")
    public ResponseEntity<CommonResponse> deleteSnapshot(@RequestParam("v") String snapshotId) {
        snapshotService.deleteSnapshotById(snapshotId);

        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response("Delete snapshot : " + snapshotId)
                .build();

        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
