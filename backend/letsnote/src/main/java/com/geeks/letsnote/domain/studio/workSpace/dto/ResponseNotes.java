package com.geeks.letsnote.domain.studio.workSpace.dto;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import lombok.Builder;

import java.util.List;

public record ResponseNotes() {
    @Builder
    public record NotesDto(
            String snapshotTitle,
            List<Notes> notes,
            Integer maxX,
            Integer bpm
    ){}

    @Builder
    public record Notes(
            Instrument instrument,
            List<Note> notes
    ) {}

    @Builder
    public record Note (
            Integer noteX,
            Integer noteY
    ) {}


}
