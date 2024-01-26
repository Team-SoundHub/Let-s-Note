package com.geeks.letsnote.snapshot.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "snapshot_instrument_map")
@Getter
@NoArgsConstructor
public class SnapshotInstrumentMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "map_id")
    private Long mapId;

    @Column(name = "snapshot_id", nullable = false)
    private Long snapshotId;

    @Column(name = "instrument", nullable = false)
    private String instrument;
}
