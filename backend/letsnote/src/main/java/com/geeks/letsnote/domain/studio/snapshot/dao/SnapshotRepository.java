package com.geeks.letsnote.domain.studio.snapshot.dao;

import com.geeks.letsnote.domain.studio.snapshot.entity.Snapshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SnapshotRepository extends JpaRepository<Snapshot, String> {
    Optional<Snapshot> findBySpaceId(String spaceId);
}
