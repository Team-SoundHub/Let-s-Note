package com.geeks.letsnote.domain.studio.snapshot.api;

import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotService;
import com.geeks.letsnote.domain.studio.snapshot.dto.ResponseSnapshot;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/feeds")
public class FeedController {
    private final SnapshotService snapshotService;

    public FeedController(SnapshotService snapshotService) {
        this.snapshotService = snapshotService;
    }

    @GetMapping("")
    public ResponseEntity<CommonResponse> getFeeds(){
        List<ResponseSnapshot.SnapshotDto> feeds = snapshotService.getAllSnapshots();
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(feeds)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/snapshot-id")
    public ResponseEntity<CommonResponse> getAllOfSnapshot(@RequestParam("v") String snapshotId){
        ResponseNotes.NotesDto snapshotNotes = snapshotService.getAllNotesOfSnapshot(snapshotId);

        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(snapshotNotes)
                .build();

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PutMapping("/views/snapshot-id")
    public ResponseEntity<CommonResponse> incrementViewsOfSnapshot(@RequestParam("v") String snapshotId){
        snapshotService.incrementViewsOfSnapshot(snapshotId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
