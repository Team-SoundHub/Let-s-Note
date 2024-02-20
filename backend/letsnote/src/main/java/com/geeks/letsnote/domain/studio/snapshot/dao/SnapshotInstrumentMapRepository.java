package com.geeks.letsnote.domain.studio.snapshot.dao;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.snapshot.entity.SnapshotInstrumentMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SnapshotInstrumentMapRepository extends JpaRepository<SnapshotInstrumentMap , String> {
    Optional<SnapshotInstrumentMap> findBySnapshotIdAndInstrument(String snapshotId, Instrument instrument);
}
