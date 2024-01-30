package com.geeks.letsnote.domain.studio.snapshot.application;

import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;

import java.util.List;

public interface SnapshotNoteService {
    void storeSnapshotNotesByMap(ResponseNotes.Notes notes, String mapId);

    List<ResponseNotes.Note> getSnapshotNoteByMapId(String mapId);
}
