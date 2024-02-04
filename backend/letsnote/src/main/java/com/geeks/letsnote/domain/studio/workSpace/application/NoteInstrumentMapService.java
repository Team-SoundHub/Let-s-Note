package com.geeks.letsnote.domain.studio.workSpace.application;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.global.network.dto.SocketRequest;
import com.geeks.letsnote.global.network.dto.SocketResponse;

import java.util.List;

public interface NoteInstrumentMapService {
    ResponseNotes.Notes getAllInstrumentNoteBySpaceId (String spaceId, Instrument instrument);

    void clickNoteMap(SocketRequest.Coordinate coordinate);
    void createWorkspaceInstrumentMap(String spaceId);

    List<SocketResponse.Note> deleteNoteBySpaceIdAndInstrument(SocketRequest.SpaceInstrument spaceInstrument);

    String getInstrumentMapBySpaceIdAndInstrument(String spaceId, Instrument instrument);
}
