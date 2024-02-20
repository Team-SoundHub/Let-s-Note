package com.geeks.letsnote.domain.studio.snapshot.application.impl;

import com.geeks.letsnote.domain.studio.snapshot.application.SnapshotNoteService;
import com.geeks.letsnote.domain.studio.snapshot.dao.SnapshotNoteRepository;
import com.geeks.letsnote.domain.studio.snapshot.entity.SnapshotNote;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.domain.studio.workSpace.entity.Note;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SnapshotNoteImpl implements SnapshotNoteService {

    private final SnapshotNoteRepository snapshotNoteRepository;

    public SnapshotNoteImpl(SnapshotNoteRepository snapshotNoteRepository) {
        this.snapshotNoteRepository = snapshotNoteRepository;
    }

    @Override
    @Transactional
    public void storeSnapshotNotesByMap(ResponseNotes.Notes notes, String mapId) {
        List<SnapshotNote> snapshotNoteEntities = new ArrayList<>();
        for(ResponseNotes.Note note : notes.notes()){
            snapshotNoteEntities.add(SnapshotNote.builder().noteX(note.noteX()).noteY(note.noteY()).snapshotInstrument(mapId).build());
        }
        snapshotNoteRepository.saveAll(snapshotNoteEntities);
    }

    @Override
    public List<ResponseNotes.Note> getSnapshotNoteByMapId(String mapId) {
        List<SnapshotNote> notes = snapshotNoteRepository.findAllBySnapshotInstrument(mapId);
        List<ResponseNotes.Note> noteDto = new ArrayList<>();
        for(SnapshotNote snapshotNote : notes){
            noteDto.add(ResponseNotes.Note.builder()
                    .noteY(snapshotNote.getNoteY())
                    .noteX(snapshotNote.getNoteX())
                    .build());
        }
        return noteDto;
    }
}
