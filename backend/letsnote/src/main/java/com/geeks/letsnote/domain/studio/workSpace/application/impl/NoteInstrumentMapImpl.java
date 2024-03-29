package com.geeks.letsnote.domain.studio.workSpace.application.impl;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteInstrumentMapService;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteService;
import com.geeks.letsnote.domain.studio.workSpace.dao.NoteInstrumentMapRepository;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.domain.studio.workSpace.entity.NoteInstrumentMap;
import com.geeks.letsnote.domain.studio.workSpace.semaphore.SemaphoreService;
import com.geeks.letsnote.global.network.dto.SocketRequest;
import com.geeks.letsnote.global.network.dto.SocketResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NoteInstrumentMapImpl implements NoteInstrumentMapService {

    private final NoteInstrumentMapRepository noteInstrumentMapRepository;
    private final NoteService noteService;
    private final SemaphoreService semaphoreService;

    public NoteInstrumentMapImpl(NoteInstrumentMapRepository noteInstrumentMapRepository, NoteService noteService, SemaphoreService semaphoreService) {
        this.noteInstrumentMapRepository = noteInstrumentMapRepository;
        this.noteService = noteService;
        this.semaphoreService = semaphoreService;
    }

    @Override
    public ResponseNotes.Notes getAllInstrumentNoteBySpaceId(String spaceId, Instrument instrument) {
        Optional<NoteInstrumentMap> noteInstrumentMapper = noteInstrumentMapRepository.findBySpaceIdAndInstrument(spaceId,instrument);
        List<ResponseNotes.Note> notes = noteService.getNoteByMapId(noteInstrumentMapper.get().getMapId());
        ResponseNotes.Notes getNotes = ResponseNotes.Notes.builder()
                .instrument(instrument)
                .notes(notes)
                .build();
        return getNotes;
    }

    @Override
    @Transactional
    public void createWorkspaceInstrumentMap(String spaceId) {
        String pianoMapId = UUID.randomUUID().toString().replace("-","");
        noteInstrumentMapRepository.save(NoteInstrumentMap.builder().mapId(pianoMapId).instrument(Instrument.Piano).spaceId(spaceId).build());

        String guitarMapId = UUID.randomUUID().toString().replace("-","");
        noteInstrumentMapRepository.save(NoteInstrumentMap.builder().mapId(guitarMapId).instrument(Instrument.Drum).spaceId(spaceId).build());

        String drumMapId = UUID.randomUUID().toString().replace("-","");
        noteInstrumentMapRepository.save(NoteInstrumentMap.builder().mapId(drumMapId).instrument(Instrument.Guitar).spaceId(spaceId).build());
    }


    @Override
    public void clickNoteMap(SocketRequest.Coordinate coordinate) {
        semaphoreService.acquireSemaphore(coordinate.spaceId());
        Optional<NoteInstrumentMap> noteInstrumentMap = noteInstrumentMapRepository.findBySpaceIdAndInstrument(coordinate.spaceId(), Instrument.fromString(coordinate.instrument()));
        noteService.clickNote(noteInstrumentMap.get().getMapId(), RequestNotes.NoteDto.builder().instrument(Instrument.fromString(coordinate.instrument())).noteY(coordinate.y()).noteX(coordinate.x()).build());
        semaphoreService.releaseSemaphore(coordinate.spaceId());
    }

    @Override
    @Transactional
    public List<SocketResponse.Note> deleteNoteBySpaceIdAndInstrument(SocketRequest.SpaceInstrument spaceInstrument){
//        if(spaceInstrument.instrument().equals(Instrument.All)){
//            List<String> noteInstrumentMapIds = noteInstrumentMapRepository.findAllMapIdsBySpaceId(spaceInstrument.spaceId());
//            noteService.deleteAllInstrumentNotesByMapId(noteInstrumentMapIds);
//        }
//        else{
        Optional<NoteInstrumentMap> noteInstrumentMap = noteInstrumentMapRepository.findBySpaceIdAndInstrument(spaceInstrument.spaceId(), spaceInstrument.instrument());
        List<SocketResponse.Note> deletedNote = noteService.deleteInstrumentNotesByMapId(noteInstrumentMap.get().getMapId());
//        }
        return deletedNote;
    }

    @Override
    @Transactional
    public String getInstrumentMapBySpaceIdAndInstrument(String spaceId, Instrument instrument) {
        NoteInstrumentMap map = noteInstrumentMapRepository.findBySpaceIdAndInstrument(spaceId,instrument).orElse(null);
        return map.getMapId();
    }
}
