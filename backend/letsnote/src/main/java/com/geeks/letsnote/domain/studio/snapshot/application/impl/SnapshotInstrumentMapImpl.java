package com.geeks.letsnote.domain.studio.snapshot.application.impl;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotInstrumentMapService;
import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotNoteService;
import com.geeks.letsnote.domain.studio.snapshot.dao.SnapshotInstrumentMapRepository;
import com.geeks.letsnote.domain.studio.snapshot.entity.SnapshotInstrumentMap;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteInstrumentMapService;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SnapshotInstrumentMapImpl implements SnapshotInstrumentMapService {
    private final SnapshotInstrumentMapRepository snapshotInstrumentMapRepository;
    private final NoteInstrumentMapService noteInstrumentMapService;
    private final SnapshotNoteService snapshotNoteService;

    public SnapshotInstrumentMapImpl(SnapshotInstrumentMapRepository snapshotInstrumentMapRepository, NoteInstrumentMapService noteInstrumentMapService, SnapshotNoteService snapshotNoteService) {
        this.snapshotInstrumentMapRepository = snapshotInstrumentMapRepository;
        this.noteInstrumentMapService = noteInstrumentMapService;
        this.snapshotNoteService = snapshotNoteService;
    }

    @Override
    @Transactional
    public void createSnapshotInstrumentMap(String snapshotId, String spaceId) {
        String pianoMapId = UUID.randomUUID().toString().replace("-","");
        snapshotInstrumentMapRepository.save(SnapshotInstrumentMap.builder().mapId(pianoMapId).instrument(Instrument.Piano).snapshotId(snapshotId).build());
        ResponseNotes.Notes pianoNotes = noteInstrumentMapService.getAllInstrumentNoteBySpaceId(spaceId , Instrument.Piano);
        snapshotNoteService.storeSnapshotNotesByMap(pianoNotes,pianoMapId);

        String guitarMapId = UUID.randomUUID().toString().replace("-","");
        snapshotInstrumentMapRepository.save(SnapshotInstrumentMap.builder().mapId(guitarMapId).instrument(Instrument.Guitar).snapshotId(snapshotId).build());
        ResponseNotes.Notes guitarNotes = noteInstrumentMapService.getAllInstrumentNoteBySpaceId(spaceId , Instrument.Guitar);
        snapshotNoteService.storeSnapshotNotesByMap(guitarNotes,guitarMapId);

        String drumMapId = UUID.randomUUID().toString().replace("-","");
        snapshotInstrumentMapRepository.save(SnapshotInstrumentMap.builder().mapId(drumMapId).instrument(Instrument.Drum).snapshotId(snapshotId).build());
        ResponseNotes.Notes drumNotes = noteInstrumentMapService.getAllInstrumentNoteBySpaceId(spaceId , Instrument.Drum);
        snapshotNoteService.storeSnapshotNotesByMap(drumNotes,drumMapId);
    }

    @Override
    public ResponseNotes.Notes getAllInstrumentNoteBySpaceId(String snapshotId, Instrument instrument) {
        Optional<SnapshotInstrumentMap> snapshotInstrumentMapper = snapshotInstrumentMapRepository.findBySnapshotIdAndInstrument(snapshotId,instrument);
        List<ResponseNotes.Note> notes = snapshotNoteService.getSnapshotNoteByMapId(snapshotInstrumentMapper.get().getMapId());
        ResponseNotes.Notes instrumentNotes = ResponseNotes.Notes.builder()
                .instrument(instrument)
                .notes(notes)
                .build();
        return instrumentNotes;
    }


}
