package com.geeks.letsnote.domain.studio.workSpace.dto;

import lombok.Builder;

import java.sql.Timestamp;
import java.util.List;

public record ResponseWorkspaces() {
    @Builder
    public record WorkspaceDto(
            String spaceId,
            List<String> memberNicknames,
            String spaceTitle,
            String spaceContent,
            Timestamp updateAt
    ){}

    @Builder
    public record WorkspaceId(
            String spaceId
    ){}
}
