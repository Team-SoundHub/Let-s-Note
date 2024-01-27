package com.geeks.letsnote.snapshot.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "snapshot_note")
@Getter
@NoArgsConstructor
public class SnapshotNote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id")
    private Long noteId;

    @Column(name = "snapshot_instrument", nullable = false)
    private Long snapshotInstrument;

    @Column(name = "note_x", nullable = false)
    private Long noteX;

    @Column(name = "note_y", nullable = false)
    private Long noteY;
}
