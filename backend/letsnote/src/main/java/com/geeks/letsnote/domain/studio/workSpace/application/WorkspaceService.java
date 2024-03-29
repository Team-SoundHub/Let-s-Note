package com.geeks.letsnote.domain.studio.workSpace.application;

import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.entity.Workspace;
import com.geeks.letsnote.global.network.dto.SocketRequest;
import com.geeks.letsnote.global.network.dto.SocketResponse;

import java.util.List;

public interface WorkspaceService {
    List<ResponseWorkspaces.WorkspaceDto> getAllWorkspacesByOwnerId(Long accountId);
    ResponseWorkspaces.WorkspaceId createWorkspace(RequestWorkspaces.WorkspaceDto workspaceDto, Long accountId);

    ResponseWorkspaces.WorkspaceIn getAllNotesOfWorkspace(String spaceId);

    void deleteAllWorkspaces();

    List<String> getSpaceIdsFromAccountId(Long accountId);

    List<String> getMemberNicknamesFromWorkspace(Workspace workspace);
    String getOwnerNicknameFromWorkspace(Workspace workspace);

    Workspace getById(String workspaceId);

    ResponseWorkspaces.WorkspaceMembers getMemberNicknamesFromSpaceId(String spaceId);

    boolean checkMaxCountSnapshot(String spaceId);

    void increaseSnapshotCount(String spaceId);

    void decreaseSnapshotCountById(Workspace snapshotWorkspace);

    ResponseWorkspaces.MemberNickname addMemberOfWorkspace(String userId, String spaceId);

    SocketResponse.LoopNotes makeLoop(SocketRequest.LoopStatus loopStatus, String spaceId);

    Integer calculateMaxXLoop(ResponseNotes.Notes notes);

    void deleteWorkspaceById(String spaceId);
}
