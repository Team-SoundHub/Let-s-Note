package com.geeks.letsnote.domain.studio.workSpace.dto;

import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.util.List;

public record RequestWorkspaces() {
    @Builder
    public record WorkspaceDto(
            String spaceTitle,
            String spaceContent,
            List<Long> memberAccountId
    ){}

    @Builder
    public record WorkspaceMemberMapDto(
            String spaceId,
            List<Long> memberAccountId
    ){}
}
