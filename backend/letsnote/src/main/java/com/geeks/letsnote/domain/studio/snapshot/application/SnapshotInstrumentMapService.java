package com.geeks.letsnote.domain.studio.snapshot.application;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;

public interface SnapshotInstrumentMapService {
    void createSnapshotInstrumentMap(String snapshotId, String spaceId);

    ResponseNotes.Notes getAllInstrumentNoteBySpaceId(String snapshotId, Instrument instrument);
}
