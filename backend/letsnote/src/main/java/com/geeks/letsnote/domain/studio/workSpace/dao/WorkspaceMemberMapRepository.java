package com.geeks.letsnote.domain.studio.workSpace.dao;

import com.geeks.letsnote.domain.studio.workSpace.entity.WorkspaceMemberMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkspaceMemberMapRepository extends JpaRepository<WorkspaceMemberMap,Long> {
    List<WorkspaceMemberMap> findAllBySpaceId(String spaceId);

    List<WorkspaceMemberMap> findAllByAccountId(Long accountId);
}
