package com.geeks.letsnote.domain.studio.snapshot.dto;

import lombok.Builder;

import java.sql.Timestamp;
import java.util.List;

public record ResponseSnapshot() {
    @Builder
    public record SnapshotId (
            String snapshotId
    ) {}

    @Builder
    public record ResponseDto(
            String snapshotId
    ){}

    @Builder
    public record SnapshotDto(
            String snapshotId,
            String ownerNickname,
            List<String> memberNicknames,
            String snapshotTitle,
            String snapshotContent,
            Timestamp updateAt
    ){}
}
