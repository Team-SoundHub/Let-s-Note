package com.geeks.letsnote.domain.studio.workSpace.application;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;

public interface NoteInstrumentMapService {
    ResponseNotes.Notes getAllInstrumentNoteBySpaceId (String spaceId, Instrument instrument);

    void clickOnNote(String spaceId, RequestNotes.NoteDto note);
    void createWorkspaceInstrumentMap(String spaceId);
}
