package com.geeks.letsnote.domain.studio.workSpace.application;

import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.global.network.dto.SocketResponse;

import java.util.List;

public interface NoteService {
    List<ResponseNotes.Note> getNoteByMapId(String mapId);

    void clickNote(String mapId, RequestNotes.NoteDto note);

    void deleteAllDatabaseNotes();

    void deleteAllNoteByMap();

    void deleteAllInstrumentNotesByMapId(List<String> noteInstrumentMapIds);

    List<SocketResponse.Note> deleteInstrumentNotesByMapId(String mapId);

    void createNotesByMapId(String mapId, List<SocketResponse.Note> loopNotes);
}
