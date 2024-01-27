package com.geeks.letsnote.domain.studio.workSpace.application.impl;


import com.geeks.letsnote.domain.account.dao.AccountRepository;
import com.geeks.letsnote.domain.account.entity.Account;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceMemberMapService;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import com.geeks.letsnote.domain.studio.workSpace.dao.WorkspaceMemberMapRepository;
import com.geeks.letsnote.domain.studio.workSpace.dao.WorkspaceRepository;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.entity.Workspace;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class WorkspaceImpl implements WorkspaceService {
    private final WorkspaceRepository workspaceRepository;
    private final AccountRepository accountRepository;
    private final WorkspaceMemberMapRepository workspaceMemberMapRepository;

    private final WorkspaceMemberMapService workspaceMemberMapService;

    public WorkspaceImpl(WorkspaceRepository workspaceRepository, AccountRepository accountRepository, WorkspaceMemberMapRepository workspaceMemberMapRepository, WorkspaceMemberMapService workspaceMemberMapService) {
        this.workspaceRepository = workspaceRepository;
        this.accountRepository = accountRepository;
        this.workspaceMemberMapRepository = workspaceMemberMapRepository;
        this.workspaceMemberMapService = workspaceMemberMapService;
    }

    @Override
    public List<ResponseWorkspaces.WorkspaceDto> getAllWorkspacesByUserName(String userName) {
        Optional<Account> requestAccount = accountRepository.findByUsername(userName);
        List<Workspace> workspaceList = workspaceRepository.findAllByOwnerId(requestAccount.get().getId());
        Collections.sort(workspaceList, Comparator.comparing(Workspace::getUpdateAt).reversed());
        List<ResponseWorkspaces.WorkspaceDto> workspaceDtoList = new ArrayList<>();

        for(Workspace workspace : workspaceList) {
            List<Long> members = workspaceMemberMapRepository.findAccountIdsBySpaceId(workspace.getSpaceId());
            ResponseWorkspaces.WorkspaceDto workspaceDto = ResponseWorkspaces.WorkspaceDto.builder()
                    .spaceId(workspace.getSpaceId())
                    .memberNicknames(accountRepository.findNicknameByIdIn(members))
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
    public String createWorkspace(RequestWorkspaces.WorkspaceDto workspaceDto) {
        Long accountId = accountRepository.findIdByUsername(workspaceDto.username());
        Workspace workspace = Workspace.builder()
                .spaceId(UUID.randomUUID().toString().replace("-",""))
                .ownerId(accountId)
                .spaceTitle(workspaceDto.spaceTitle())
                .spaceContent(workspaceDto.spaceContent())
                .updateAt(new Timestamp(new Date().getTime()))
                .snapshot(false)
                .build();
        workspaceRepository.save(workspace);

        if(workspaceDto.memberAccountId() != null){
            RequestWorkspaces.WorkspaceMemberMapDto workspaceMemberMapDto = RequestWorkspaces.WorkspaceMemberMapDto.builder()
                    .memberAccountId(workspaceDto.memberAccountId())
                    .spaceId(workspace.getSpaceId()).build();

            workspaceMemberMapService.createWorkspaceMemberMap(workspaceMemberMapDto);
        }

        return workspace.getSpaceId();
    }
}
