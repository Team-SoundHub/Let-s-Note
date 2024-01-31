package com.geeks.letsnote.domain.studio.snapshot.entity;

import jakarta.persistence.*;
import lombok.Builder;
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
    private String snapshotInstrument;

    @Column(name = "note_x", nullable = false)
    private Integer noteX;

    @Column(name = "note_y", nullable = false)
    private Integer noteY;

    @Builder
    public SnapshotNote(Long noteId, String snapshotInstrument, Integer noteX, Integer noteY) {
        this.noteId = noteId;
        this.snapshotInstrument = snapshotInstrument;
        this.noteX = noteX;
        this.noteY = noteY;
    }
}
