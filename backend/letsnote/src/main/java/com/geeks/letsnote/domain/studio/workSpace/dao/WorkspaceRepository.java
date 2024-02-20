package com.geeks.letsnote.domain.studio.workSpace.dao;

import com.geeks.letsnote.domain.studio.workSpace.entity.Workspace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface WorkspaceRepository extends JpaRepository<Workspace, String> {

    @Query("SELECT w FROM Workspace w WHERE w.spaceId IN :spaceIds ORDER BY w.updateAt DESC")
    List<Workspace> findWorkSpacesBySpaceIdsOrderByUpdateAt(@Param("spaceIds")List<String> spaceIds);

    @Modifying
    @Transactional
    @Query("UPDATE Workspace w SET w.snapshotCount = w.snapshotCount + 1 WHERE w.spaceId = :spaceId")
    void incrementSnapshotCount(@Param("spaceId") String spaceId);

    @Modifying
    @Transactional
    @Query("UPDATE Workspace w SET w.snapshotCount = w.snapshotCount - 1 WHERE w.spaceId = :spaceId")
    void decrementSnapshotCount(@Param("spaceId") String spaceId);
}
