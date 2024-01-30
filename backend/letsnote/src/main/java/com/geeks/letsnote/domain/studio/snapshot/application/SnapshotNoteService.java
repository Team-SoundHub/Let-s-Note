package com.geeks.letsnote.domain.studio.snapshot.application;

import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;

public interface SnapshotNoteService {
    void storeSnapshotNotesByMap(ResponseNotes.Notes notes, String mapId);
}
