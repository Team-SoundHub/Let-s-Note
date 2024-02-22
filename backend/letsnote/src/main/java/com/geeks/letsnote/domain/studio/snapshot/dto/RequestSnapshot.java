package com.geeks.letsnote.domain.studio.snapshot.dto;

import lombok.Builder;

public record RequestSnapshot() {
    @Builder
    public record SnapshotDto(
            String snapshotTitle,
            String snapshotContent,
            Integer bpm
    ){}
}
