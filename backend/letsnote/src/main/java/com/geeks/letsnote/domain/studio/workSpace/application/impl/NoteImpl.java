package com.geeks.letsnote.domain.studio.workSpace.application.impl;

import com.geeks.letsnote.domain.studio.workSpace.application.NoteService;
import com.geeks.letsnote.domain.studio.workSpace.dao.NoteRepository;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.domain.studio.workSpace.entity.Note;
import com.geeks.letsnote.domain.studio.workSpace.entity.NoteInstrumentMap;
import com.geeks.letsnote.global.network.dto.SocketResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class NoteImpl implements NoteService {
    private final NoteRepository noteRepository;

    public NoteImpl(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }


    @Override
    public List<ResponseNotes.Note> getNoteByMapId(String mapId) {
        List<Note> notes = noteRepository.findAllBySpaceInstrument(mapId);
        List<ResponseNotes.Note> noteDto = new ArrayList<>();
        for(Note note : notes){
            noteDto.add(ResponseNotes.Note.builder()
                    .noteY(note.getNoteY())
                    .noteX(note.getNoteX())
                    .build());
        }
        return noteDto;
    }

    @Override
    @Transactional
    public void clickNote(String mapId, RequestNotes.NoteDto note) {
        Optional<Note> noteEntity = noteRepository.findBySpaceInstrumentAndNoteXAndNoteY(mapId, note.noteX(),note.noteY());
        if(noteEntity.isEmpty()){
            noteRepository.save(Note.builder().spaceInstrument(mapId).noteX(note.noteX()).noteY(note.noteY()).build());
        }
        else {
            noteRepository.deleteById(noteEntity.get().getNoteId());
        }
    }



    //for delete database
    @Override
    public void deleteAllDatabaseNotes() {
        noteRepository.deleteAll();
    }

    @Override
    public void deleteAllNoteByMap() {
    }

    @Override
    @Transactional
    public void deleteAllInstrumentNotesByMapId(List<String> noteInstrumentMapIds) {
        noteRepository.deleteAllBySpaceInstruments(noteInstrumentMapIds);
    }

    @Override
    @Transactional
    public List<SocketResponse.Note> deleteInstrumentNotesByMapId(String mapId) {
        List<Note> deleteNotes = noteRepository.findAllBySpaceInstrument(mapId);
        List<SocketResponse.Note> notes = new ArrayList<>();
        for(Note note : deleteNotes){
            SocketResponse.Note noteDto = SocketResponse.Note.builder()
                    .x(note.getNoteX())
                    .y(note.getNoteY())
                    .build();
            notes.add(noteDto);
        }
        noteRepository.deleteAllBySpaceInstrument(mapId);
        return notes;
    }

    @Override
    @Transactional
    public void createNotesByMapId(String mapId, List<SocketResponse.Note> loopNotes) {
        Set<Note> notes = new HashSet<>();
        for(SocketResponse.Note eachNote : loopNotes){
            notes.add(Note.builder()
                    .spaceInstrument(mapId)
                    .noteX(eachNote.x())
                    .noteY(eachNote.y())
                    .build());
        }
        noteRepository.saveAll(notes);
    }
}
