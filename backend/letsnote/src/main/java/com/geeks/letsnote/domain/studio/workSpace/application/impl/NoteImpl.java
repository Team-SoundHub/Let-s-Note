package com.geeks.letsnote.domain.studio.workSpace.application.impl;

import com.geeks.letsnote.domain.studio.workSpace.application.NoteService;
import com.geeks.letsnote.domain.studio.workSpace.dao.NoteRepository;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.domain.studio.workSpace.entity.Note;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        noteRepository.save(Note.builder().noteX(note.noteX()).noteY(note.noteY()).spaceInstrument(mapId).build());
    }


}
