package com.geeks.letsnote.domain.studio.workSpace.application.impl;


import com.geeks.letsnote.domain.account.dao.AccountRepository;
import com.geeks.letsnote.domain.account.entity.Account;
import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteInstrumentMapService;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceMemberMapService;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import com.geeks.letsnote.domain.studio.workSpace.dao.WorkspaceMemberMapRepository;
import com.geeks.letsnote.domain.studio.workSpace.dao.WorkspaceRepository;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseNotes;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.entity.NoteInstrumentMap;
import com.geeks.letsnote.domain.studio.workSpace.entity.Workspace;
import com.geeks.letsnote.domain.studio.workSpace.entity.WorkspaceMemberMap;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class WorkspaceImpl implements WorkspaceService {
    private final WorkspaceRepository workspaceRepository;
    private final AccountRepository accountRepository;
    private final WorkspaceMemberMapRepository workspaceMemberMapRepository;
    private final WorkspaceMemberMapService workspaceMemberMapService;
    private final NoteInstrumentMapService noteInstrumentMapService;


    public WorkspaceImpl(WorkspaceRepository workspaceRepository, AccountRepository accountRepository, WorkspaceMemberMapRepository workspaceMemberMapRepository, WorkspaceMemberMapService workspaceMemberMapService, NoteInstrumentMapService noteInstrumentMapService) {
        this.workspaceRepository = workspaceRepository;
        this.accountRepository = accountRepository;
        this.workspaceMemberMapRepository = workspaceMemberMapRepository;
        this.workspaceMemberMapService = workspaceMemberMapService;
        this.noteInstrumentMapService = noteInstrumentMapService;
    }

    @Override
    public List<ResponseWorkspaces.WorkspaceDto> getAllWorkspacesByOwnerId(Long accountId) {
        List<String> workSpaceIdsFromAccountId = workspaceMemberMapRepository.findSpaceIdsByAccountId(accountId);
        List<Workspace> workspaceList = workspaceRepository.findSpaceIdsByOwnerIdsOrderByUpdateAt(workSpaceIdsFromAccountId);
        List<ResponseWorkspaces.WorkspaceDto> workspaceDtoList = new ArrayList<>();

        for(Workspace workspace : workspaceList) {
            List<Long> accountIdsFromSpaceId = workspaceMemberMapRepository.findAccountIdsBySpaceId(workspace.getSpaceId());
            List<String> memberNickNames = accountRepository.findMemberNickNamesFromAccountIds(accountIdsFromSpaceId);
            String ownerNickName = accountRepository.findNicknameById(workspace.getOwnerId());

            ResponseWorkspaces.WorkspaceDto workspaceDto = ResponseWorkspaces.WorkspaceDto.builder()
                    .spaceId(workspace.getSpaceId())
                    .ownerNickname(ownerNickName)
                    .memberNicknames(memberNickNames)
                    .spaceTitle(workspace.getSpaceTitle())
                    .spaceContent(workspace.getSpaceContent())
                    .updateAt(workspace.getUpdateAt())
                    .build();
            workspaceDtoList.add(workspaceDto);
        }

        return workspaceDtoList;
    }

    @Override
    @Transactional
    public ResponseWorkspaces.WorkspaceId createWorkspace(RequestWorkspaces.WorkspaceDto workspaceDto, Long accountId) {
        String spaceId = UUID.randomUUID().toString().replace("-","");
        Workspace workspace = Workspace.builder()
                .spaceId(spaceId)
                .ownerId(accountId)
                .spaceTitle(workspaceDto.spaceTitle())
                .spaceContent(workspaceDto.spaceContent())
                .snapshot(false)
                .build();
        workspaceRepository.save(workspace);

        workspaceDto.membersAccountId().add(accountId);
        RequestWorkspaces.WorkspaceMemberMapDto workspaceMemberMapDto = RequestWorkspaces.WorkspaceMemberMapDto.builder()
                .memberAccountId(workspaceDto.membersAccountId())
                .spaceId(workspace.getSpaceId())
                .build();

        workspaceMemberMapService.createWorkspaceMemberMap(workspaceMemberMapDto);

        noteInstrumentMapService.createWorkspaceInstrumentMap(spaceId);

        return ResponseWorkspaces.WorkspaceId.builder()
                .spaceId(workspace.getSpaceId())
                .build();
    }

    @Override
    public List<ResponseNotes.Notes> getAllNoteOfWorkspace(String spaceId) {
        List<ResponseNotes.Notes> allNotes = new ArrayList<>();
        ResponseNotes.Notes pianoNotes = noteInstrumentMapService.getAllInstrumentNoteBySpaceId(spaceId, Instrument.Piano);
        allNotes.add(pianoNotes);
        ResponseNotes.Notes guitarNotes = noteInstrumentMapService.getAllInstrumentNoteBySpaceId(spaceId, Instrument.Guitar);
        allNotes.add(guitarNotes);
        ResponseNotes.Notes drumNotes = noteInstrumentMapService.getAllInstrumentNoteBySpaceId(spaceId,Instrument.Drum);
        allNotes.add(drumNotes);

        return allNotes;
    }



    //for db delete
    @Override
    public void deleteAllWorkspaces() {
        workspaceRepository.deleteAll();
    }
}
