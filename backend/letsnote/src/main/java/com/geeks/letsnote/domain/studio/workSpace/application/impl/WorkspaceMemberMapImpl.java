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
    private final AccountRepository accountRepository;

    public WorkspaceMemberMapImpl(WorkspaceMemberMapRepository workspaceMemberMapRepository, AccountRepository accountRepository) {
        this.workspaceMemberMapRepository = workspaceMemberMapRepository;
        this.accountRepository = accountRepository;
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
}
