package com.geeks.letsnote.domain.studio.workSpace.dao;

import com.geeks.letsnote.domain.studio.workSpace.entity.WorkspaceMemberMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkspaceMemberMapRepository extends JpaRepository<WorkspaceMemberMap,Long> {

    @Query("SELECT w.spaceId FROM WorkspaceMemberMap w WHERE w.accountId = :accountId")
    List<String> findSpaceIdsByAccountId(@Param("accountId")Long accountId);

//    @Query("SELECT w.accountId FROM WorkspaceMemberMap w WHERE w.spaceId = :spaceId AND w.accountId != :ownerId")
//    List<Long> findAccountIdsBySpaceIdNotInOwnerId(@Param("spaceId")String spaceId, @Param("ownerId")Long ownerId);

    @Query("SELECT w.accountId FROM WorkspaceMemberMap w WHERE w.spaceId = :spaceId")
    List<Long> findAccountIdsBySpaceId(@Param("spaceId")String spaceId);
}
