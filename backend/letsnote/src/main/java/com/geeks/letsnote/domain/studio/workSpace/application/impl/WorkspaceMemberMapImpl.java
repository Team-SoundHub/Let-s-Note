package com.geeks.letsnote.domain.studio.workSpace.application.impl;

import com.geeks.letsnote.domain.account.dao.AccountRepository;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceMemberMapService;
import com.geeks.letsnote.domain.studio.workSpace.dao.WorkspaceMemberMapRepository;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.entity.WorkspaceMemberMap;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WorkspaceMemberMapImpl implements WorkspaceMemberMapService {
    private final WorkspaceMemberMapRepository workspaceMemberMapRepository;

    public WorkspaceMemberMapImpl(WorkspaceMemberMapRepository workspaceMemberMapRepository) {
        this.workspaceMemberMapRepository = workspaceMemberMapRepository;
    }


    @Override
    @Transactional
    public void createWorkspaceMemberMap(RequestWorkspaces.WorkspaceMemberMapDto workspaceMemberMapDto) {
        for(Long memberAccountId : workspaceMemberMapDto.memberAccountId()){
            WorkspaceMemberMap workspaceMemberMap = WorkspaceMemberMap.builder()
                    .accountId(memberAccountId)
                    .spaceId(workspaceMemberMapDto.spaceId()).build();
            workspaceMemberMapRepository.save(workspaceMemberMap);
        }
    }

    @Override
    public boolean isAccountIdInWorkSpace(String spaceId, Long accountId) {
        return workspaceMemberMapRepository.existsBySpaceIdAndAccountId(spaceId, accountId);
    }

    @Override
    public void addMemberMap(String spaceId, Long id) {
        WorkspaceMemberMap map = WorkspaceMemberMap.builder()
                .accountId(id)
                .spaceId(spaceId).build();
        workspaceMemberMapRepository.save(map);
    }
}
