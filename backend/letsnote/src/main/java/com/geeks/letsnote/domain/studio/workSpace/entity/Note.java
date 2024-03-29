package com.geeks.letsnote.domain.studio.workSpace.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "note")
@Getter
@NoArgsConstructor
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "note_id")
    private Long noteId;

    @Column(name = "space_instrument", nullable = false)
    private String spaceInstrument;

    @Column(name = "note_x", nullable = false )
    private Integer noteX;

    @Column(name = "note_y", nullable = false )
    private Integer noteY;

    @Builder
    public Note(Long noteId, String spaceInstrument, Integer noteX, Integer noteY) {
        this.noteId = noteId;
        this.spaceInstrument = spaceInstrument;
        this.noteX = noteX;
        this.noteY = noteY;
    }
}
