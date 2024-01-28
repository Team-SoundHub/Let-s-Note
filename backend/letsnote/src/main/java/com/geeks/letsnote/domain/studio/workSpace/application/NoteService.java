package com.geeks.letsnote.domain.studio.workSpace.application;

import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;

public interface NoteService {
    ResponseNotes.Note getNoteByMapId(String mapId);

    void clickNote(String mapId, RequestNotes.NoteDto note);
}
