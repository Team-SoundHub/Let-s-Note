package com.geeks.letsnote.domain.studio.snapshot.api;

import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotService;
import com.geeks.letsnote.domain.studio.snapshot.dto.RequestSnapshot;
import com.geeks.letsnote.domain.studio.snapshot.dto.ResponseSnapshot;
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

    public SnapshotController(SnapshotService snapshotService, AccountService accountService) {
        this.snapshotService = snapshotService;
        this.accountService = accountService;
    }

    @PostMapping("/space-id")
    public ResponseEntity<CommonResponse> postSnapshot(@RequestParam("v") String spaceId,
                                                       @RequestBody RequestSnapshot.SnapshotDto snapshotDto) {
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
}
