package com.geeks.letsnote.domain.studio.snapshot.dto;

import lombok.Builder;

public record ResponseSnapshot() {
    @Builder
    public record SnapshotId (
            String snapshotId
    ) {}
}
