package com.geeks.letsnote.domain.studio.snapshot.api;

import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotService;
import com.geeks.letsnote.domain.studio.snapshot.dto.RequestSnapshot;
import com.geeks.letsnote.domain.studio.snapshot.dto.ResponseSnapshot;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/snapshots")
public class SnapshotController {
    private final SnapshotService snapshotService;

    public SnapshotController(SnapshotService snapshotService) {
        this.snapshotService = snapshotService;
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

}
