package com.geeks.letsnote.domain.studio.snapshot.application.impl;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotInstrumentMapService;
import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotService;
import com.geeks.letsnote.domain.studio.snapshot.dao.SnapshotRepository;
import com.geeks.letsnote.domain.studio.snapshot.dto.RequestSnapshot;
import com.geeks.letsnote.domain.studio.snapshot.dto.ResponseSnapshot;
import com.geeks.letsnote.domain.studio.snapshot.entity.Snapshot;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.domain.studio.workSpace.entity.Workspace;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class SnapshotImpl implements SnapshotService {
    private final SnapshotRepository snapshotRepository;
    private final SnapshotInstrumentMapService snapshotInstrumentMapService;
    private final WorkspaceService workspaceService;

    public SnapshotImpl(SnapshotRepository snapshotRepository, SnapshotInstrumentMapService snapshotInstrumentMapService, @Lazy WorkspaceService workspaceService) {
        this.snapshotRepository = snapshotRepository;
        this.snapshotInstrumentMapService = snapshotInstrumentMapService;
        this.workspaceService = workspaceService;
    }

    @Override
    @Transactional
    public ResponseSnapshot.SnapshotId createSnapshot(String spaceId, RequestSnapshot.SnapshotDto snapshotDto) {
        String snapshotId = UUID.randomUUID().toString().replace("-","");
        Snapshot snapshot = Snapshot.builder()
                .snapshotContent(snapshotDto.snapshotContent())
                .snapshotId(snapshotId)
                .snapshotTitle(snapshotDto.snapshotTitle())
                .spaceId(spaceId)
                .views(0L)
                .build();
        snapshotRepository.save(snapshot);

        snapshotInstrumentMapService.createSnapshotInstrumentMap(snapshotId, spaceId);
        workspaceService.increaseSnapshotCount(spaceId);

        return ResponseSnapshot.SnapshotId.builder()
                .snapshotId(snapshotId)
                .build();
    }

    @Override
    public boolean findSnapshotExist(String spaceId) {
        List<Snapshot> findSnapshot = snapshotRepository.findAllBySpaceId(spaceId);

        return findSnapshot.size() > 0 ? true : false;
    }

    @Override
    public List<ResponseSnapshot.SnapshotDto> getAllSnapshotsByAccountId(Long accountId) {
        List<String> spaceIdsFromAccountId = workspaceService.getSpaceIdsFromAccountId(accountId);
        List<Snapshot> snapshotList = snapshotRepository.findAllBySpaceIdsOrderByUpdateAt(spaceIdsFromAccountId);
        List<ResponseSnapshot.SnapshotDto> snapshotDtoList = new ArrayList<>();

        for(Snapshot snapshot : snapshotList){
            Workspace snapshotWorkspace = workspaceService.getById(snapshot.getSpaceId());
            ResponseSnapshot.SnapshotDto snapshotDto = ResponseSnapshot.SnapshotDto.builder()
                    .snapshotContent(snapshot.getSnapshotContent())
                    .snapshotId(snapshot.getSnapshotId())
                    .snapshotTitle(snapshot.getSnapshotTitle())
                    .memberNicknames(workspaceService.getMemberNicknamesFromWorkspace(snapshotWorkspace))
                    .ownerNickname(workspaceService.getOwnerNicknameFromWorkspace(snapshotWorkspace))
                    .updateAt(snapshot.getUpdateAt()).build();
            snapshotDtoList.add(snapshotDto);
        }

        return snapshotDtoList;
    }

    @Override
    @Transactional
    public ResponseNotes.NotesDto getAllNotesOfSnapshot(String snapshotId) {
        List<ResponseNotes.Notes> allNotes = new ArrayList<>();
        ResponseNotes.Notes pianoNotes = snapshotInstrumentMapService.getAllInstrumentNoteBySpaceId(snapshotId, Instrument.Piano);
        allNotes.add(pianoNotes);
        ResponseNotes.Notes guitarNotes = snapshotInstrumentMapService.getAllInstrumentNoteBySpaceId(snapshotId, Instrument.Guitar);
        allNotes.add(guitarNotes);
        Integer maxNoteX = 0;
        for (ResponseNotes.Notes notes : allNotes){
            Integer maxX = notes.notes().stream()
                    .map(ResponseNotes.Note::noteX)
                    .max(Integer::compare).orElse(0);

            if(maxNoteX < maxX) {
                maxNoteX = maxX;
            }
        }
        ResponseNotes.Notes drumNotes = snapshotInstrumentMapService.getAllInstrumentNoteBySpaceId(snapshotId, Instrument.Drum);
        allNotes.add(drumNotes);

        Optional<Snapshot> thisSnapshot = snapshotRepository.findById(snapshotId);



        ResponseNotes.NotesDto notesDto = ResponseNotes.NotesDto.builder()
                .snapshotTitle(thisSnapshot.get().getSnapshotTitle())
                .notes(allNotes)
                .maxX(maxNoteX)
                .build();





        return notesDto;
    }

    @Override
    @Transactional
    public void deleteSnapshotById(String snapshotId) {
        Optional<Snapshot> snapshot = snapshotRepository.findById(snapshotId);
        Workspace snapshotWorkspace = workspaceService.getById(snapshot.get().getSpaceId());
        workspaceService.decreaseSnapshotCountById(snapshotWorkspace);
        snapshotRepository.deleteById(snapshotId);
    }

    @Override
    public List<ResponseSnapshot.SnapshotDto> getAllSnapshots() {
        List<Snapshot> snapshotList = snapshotRepository.findAllByOrderByViewsDesc();
        List<ResponseSnapshot.SnapshotDto> snapshotDtoList = new ArrayList<>();

        for(Snapshot snapshot : snapshotList){
            Workspace snapshotWorkspace = workspaceService.getById(snapshot.getSpaceId());
            ResponseSnapshot.SnapshotDto snapshotDto = ResponseSnapshot.SnapshotDto.builder()
                    .snapshotContent(snapshot.getSnapshotContent())
                    .snapshotId(snapshot.getSnapshotId())
                    .snapshotTitle(snapshot.getSnapshotTitle())
                    .memberNicknames(workspaceService.getMemberNicknamesFromWorkspace(snapshotWorkspace))
                    .ownerNickname(workspaceService.getOwnerNicknameFromWorkspace(snapshotWorkspace))
                    .updateAt(snapshot.getUpdateAt()).build();
            snapshotDtoList.add(snapshotDto);
        }

        return snapshotDtoList;
    }

    @Override
    public void incrementViewsOfSnapshot(String snapshotId) {
        snapshotRepository.incrementSnapshotViewCount(snapshotId);
    }
}
