package com.geeks.letsnote.domain.studio.workSpace.dto;

import lombok.Builder;

import java.util.List;

public record RequestWorkspaces() {
    @Builder
    public record WorkspaceDto(
            String spaceTitle,
            String spaceContent,
            List<Long> membersAccountId
    ){}

    @Builder
    public record WorkspaceMemberMapDto(
            String spaceId,
            List<Long> memberAccountId
    ){}
}
