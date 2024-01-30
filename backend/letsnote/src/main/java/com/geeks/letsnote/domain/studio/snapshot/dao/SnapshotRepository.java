package com.geeks.letsnote.domain.studio.snapshot.dao;

import com.geeks.letsnote.domain.studio.snapshot.entity.Snapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SnapshotRepository extends JpaRepository<Snapshot, String> {
    Optional<Snapshot> findBySpaceId(String spaceId);

    @Query("SELECT s FROM Snapshot s WHERE s.spaceId IN :spaceIds ORDER BY s.updateAt")
    List<Snapshot> findAllBySpaceIdsOrderByUpdateAt(@Param("spaceIds") List<String> spaceIds);
}