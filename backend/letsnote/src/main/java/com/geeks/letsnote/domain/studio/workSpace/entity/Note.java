package com.geeks.letsnote.domain.studio.workSpace.entity;

import jakarta.persistence.*;
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
    private Long spaceInstrument;

    @Column(name = "note_x", nullable = false)
    private Long noteX;

    @Column(name = "note_y", nullable = false)
    private Long noteY;
}
