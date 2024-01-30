package com.geeks.letsnote.domain.studio.snapshot.dao;

import com.geeks.letsnote.domain.studio.snapshot.entity.SnapshotInstrumentMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SnapshotInstrumentMapRepository extends JpaRepository<SnapshotInstrumentMap , String> {
}
