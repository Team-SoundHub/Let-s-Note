package com.geeks.letsnote.domain.studio.workSpace.dao;

import com.geeks.letsnote.domain.studio.workSpace.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace,String> {
    List<Workspace> findAllByOwnerId(Long ownerId);

    @Query("SELECT w.spaceId FROM Workspace w WHERE w.ownerId IN :accountIds ORDER BY w.updateAt")
    List<Workspace> findSpaceIdsByOwnerIdsOrderByUpdateAt(@Param("accountIds")List<String> accountIds);
}
