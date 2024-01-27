package com.geeks.letsnote.domain.studio.workSpace.application;

import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseWorkspaces;

import java.util.List;

public interface WorkspaceService {
    List<ResponseWorkspaces.WorkspaceDto> getAllWorkspacesByUserName(String userName);
    String createWorkspace(RequestWorkspaces.WorkspaceDto workspaceDto);
}
