package com.geeks.letsnote.domain.studio.workSpace.dto;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import lombok.Builder;

public record RequestNotes() {
    @Builder
    public record NoteDto(
            Instrument instrument,
            Long noteX,
            Long noteY
    ){}
}
