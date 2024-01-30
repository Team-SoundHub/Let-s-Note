package com.geeks.letsnote.domain.studio.snapshot.entity;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "snapshot_instrument_map")
@Getter
@NoArgsConstructor
public class SnapshotInstrumentMap {
    @Id
    @Column(name = "map_id")
    private String mapId;

    @Column(name = "snapshot_id", nullable = false)
    private String snapshotId;

    @Enumerated(EnumType.STRING)
    @Column(name = "instrument", nullable = false)
    private Instrument instrument;

    @Builder
    public SnapshotInstrumentMap(String mapId, String snapshotId, Instrument instrument) {
        this.mapId = mapId;
        this.snapshotId = snapshotId;
        this.instrument = instrument;
    }
}
