package com.geeks.letsnote.domain.studio.workSpace.dao;

import com.geeks.letsnote.domain.studio.workSpace.entity.WorkspaceMemberMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkspaceMemberMapRepository extends JpaRepository<WorkspaceMemberMap,Long> {

    @Query("SELECT w.spaceId FROM WorkspaceMemberMap w WHERE w.accountId = :accountId")
    List<String> findSpaceIdsByAccountId(@Param("accountId")Long accountId);

//    @Query("SELECT w.accountId FROM WorkspaceMemberMap w WHERE w.spaceId = :spaceId AND w.accountId != :ownerId")
//    List<Long> findAccountIdsBySpaceIdNotInOwnerId(@Param("spaceId")String spaceId, @Param("ownerId")Long ownerId);

    @Query("SELECT w.accountId FROM WorkspaceMemberMap w WHERE w.spaceId = :spaceId")
    List<Long> findAccountIdsBySpaceId(@Param("spaceId")String spaceId);

    @Query("SELECT CASE WHEN COUNT(w) > 0 THEN true ELSE false END FROM WorkspaceMemberMap w WHERE w.spaceId = :spaceId AND w.accountId = :accountId")
    boolean existsBySpaceIdAndAccountId(@Param("spaceId") String spaceId, @Param("accountId") Long accountId);

}
