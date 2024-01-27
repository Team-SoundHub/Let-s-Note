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
import com.geeks.letsnote.domain.studio.workSpace.entity.WorkspaceMemberMap;
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
    public List<ResponseWorkspaces.WorkspaceDto> getAllWorkspacesByOwnerId(Long accountId) {
        List<WorkspaceMemberMap> workspaceMemberMaps = workspaceMemberMapRepository.findAllByAccountId(accountId);
        List<Workspace> workspaceList = new ArrayList<>();
        for(WorkspaceMemberMap workspaceMemberMap : workspaceMemberMaps){
            Optional<Workspace> workspace = workspaceRepository.findById(workspaceMemberMap.getSpaceId());
            workspaceList.add(workspace.get());
        }

        Collections.sort(workspaceList, Comparator.comparing(Workspace::getUpdateAt).reversed());
        List<ResponseWorkspaces.WorkspaceDto> workspaceDtoList = new ArrayList<>();

        for(Workspace workspace : workspaceList) {
            List<WorkspaceMemberMap> memberMaps = workspaceMemberMapRepository.findAllBySpaceId(workspace.getSpaceId());
            List<Long> members = new ArrayList<>();
            for(WorkspaceMemberMap workspaceMemberMap : memberMaps){
                if(workspace.getOwnerId() != workspaceMemberMap.getAccountId()){
                    members.add(workspaceMemberMap.getAccountId());
                }
            }
            Optional<Account> workspaceOwner = accountRepository.findById(workspace.getOwnerId());
            List<String> memberNicknames = new ArrayList<>();
            for(Long memberId : members){
                Optional<Account> member = accountRepository.findById(memberId);
                memberNicknames.add(member.get().getNickname());
            }
            ResponseWorkspaces.WorkspaceDto workspaceDto = ResponseWorkspaces.WorkspaceDto.builder()
                    .spaceId(workspace.getSpaceId())
                    .ownerNickname(workspaceOwner.get().getNickname())
                    .memberNicknames(memberNicknames)
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
        Workspace workspace = Workspace.builder()
                .spaceId(UUID.randomUUID().toString().replace("-",""))
                .ownerId(accountId)
                .spaceTitle(workspaceDto.spaceTitle())
                .spaceContent(workspaceDto.spaceContent())
                .snapshot(false)
                .build();
        workspaceRepository.save(workspace);

        workspaceDto.membersAccountId().add(accountId);
        RequestWorkspaces.WorkspaceMemberMapDto workspaceMemberMapDto = RequestWorkspaces.WorkspaceMemberMapDto.builder()
                .memberAccountId(workspaceDto.membersAccountId())
                .spaceId(workspace.getSpaceId()).build();

        workspaceMemberMapService.createWorkspaceMemberMap(workspaceMemberMapDto);

        return ResponseWorkspaces.WorkspaceId.builder()
                .spaceId(workspace.getSpaceId())
                .build();
    }
}
