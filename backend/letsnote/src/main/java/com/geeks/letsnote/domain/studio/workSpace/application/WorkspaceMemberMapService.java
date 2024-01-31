package com.geeks.letsnote.domain.studio.workSpace.application;

import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;

public interface WorkspaceMemberMapService {
    void createWorkspaceMemberMap(RequestWorkspaces.WorkspaceMemberMapDto workspaceMemberMapDto);

    boolean isAccountIdInWorkSpace(String spaceId, Long accountId);

    void addMemberMap(String spaceId, Long id);
}
