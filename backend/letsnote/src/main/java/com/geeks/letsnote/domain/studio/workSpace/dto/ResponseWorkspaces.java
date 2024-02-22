package com.geeks.letsnote.domain.studio.workSpace.dto;

import lombok.Builder;

import java.sql.Timestamp;
import java.util.List;

public record ResponseWorkspaces() {
    @Builder
    public record WorkspaceDto(
            String spaceId,
            String ownerNickname,
            List<String> memberNicknames,
            String spaceTitle,
            String spaceContent,
            Timestamp updateAt
    ){}

    @Builder
    public record WorkspaceId(
            String spaceId
    ){}

    @Builder
    public record WorkspaceIn(
            List<ResponseNotes.Notes> notesList,
            boolean isSnapshotExist,
            Integer maxX,
            Integer bpm
    ){}

    @Builder
    public record WorkspaceMembers(
            String ownerNickname,
            List<String> membersNickname
    ){}

    @Builder
    public record MemberNickname(
            String nickname
    ) {
    }
}
