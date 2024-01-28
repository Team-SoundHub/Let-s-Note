package com.geeks.letsnote.domain.studio.workSpace.application.impl;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteInstrumentMapService;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteService;
import com.geeks.letsnote.domain.studio.workSpace.dao.NoteInstrumentMapRepository;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.domain.studio.workSpace.entity.NoteInstrumentMap;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NoteInstrumentMapImpl implements NoteInstrumentMapService {

    private final NoteInstrumentMapRepository noteInstrumentMapRepository;
    private final NoteService noteService;

    public NoteInstrumentMapImpl(NoteInstrumentMapRepository noteInstrumentMapRepository, NoteService noteService) {
        this.noteInstrumentMapRepository = noteInstrumentMapRepository;
        this.noteService = noteService;
    }

    @Override
    public ResponseNotes.Notes getAllInstrumentNoteBySpaceId(String spaceId, Instrument instrument) {
        NoteInstrumentMap noteInstrumentMapper = noteInstrumentMapRepository.findBySpaceIdAndInstrument(spaceId,instrument);
        List<ResponseNotes.Note> notes = noteService.getNoteByMapId(noteInstrumentMapper.getMapId());
        ResponseNotes.Notes getNotes = ResponseNotes.Notes.builder()
                .instrument(instrument)
                .notes(notes).build();
        return getNotes;
    }

    @Override
    @Transactional
    public void createWorkspaceInstrumentMap(String spaceId) {
        String pianoMapId = UUID.randomUUID().toString().replace("-","");
        noteInstrumentMapRepository.save(NoteInstrumentMap.builder().mapId(pianoMapId).instrument(Instrument.Piano).spaceId(spaceId).build());

        String guitarMapId = UUID.randomUUID().toString().replace("-","");
        noteInstrumentMapRepository.save(NoteInstrumentMap.builder().mapId(guitarMapId).instrument(Instrument.Piano).spaceId(spaceId).build());

        String drumMapId = UUID.randomUUID().toString().replace("-","");
        noteInstrumentMapRepository.save(NoteInstrumentMap.builder().mapId(drumMapId).instrument(Instrument.Piano).spaceId(spaceId).build());
    }


    @Override
    @Transactional
    public void clickOnNote(String spaceId, RequestNotes.NoteDto note) {
        String mapId = UUID.randomUUID().toString().replace("-","");
        noteInstrumentMapRepository.save(NoteInstrumentMap.builder().mapId(mapId).instrument(note.instrument()).spaceId(spaceId).build());
        noteService.clickNote(mapId,note);
    }
}