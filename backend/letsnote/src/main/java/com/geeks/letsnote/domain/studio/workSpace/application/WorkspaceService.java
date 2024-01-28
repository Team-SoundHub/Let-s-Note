package com.geeks.letsnote.domain.studio.workSpace.application;

import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseWorkspaces;

import java.util.List;

public interface WorkspaceService {
    List<ResponseWorkspaces.WorkspaceDto> getAllWorkspacesByOwnerId(Long accountId);
    ResponseWorkspaces.WorkspaceId createWorkspace(RequestWorkspaces.WorkspaceDto workspaceDto, Long accountId);

    List<ResponseNotes.Notes> getAllNoteOfWorkspace(String spaceId);

    void deleteAllWorkspaces();
}
