package com.geeks.letsnote.domain.studio.snapshot.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "snapshot")
@Getter
@NoArgsConstructor
public class Snapshot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "snapshot_id")
    private Long snapshot_id;

    @Column(name = "space_id", nullable = false)
    private Long spaceId;

    @Column(name = "snapshot_title", nullable = false, length = 50)
    private String snapshotTitle;

    @Column(name = "snapshot_content", nullable = false, length = 255)
    private String snapshotContent;

    @Column(name = "update_at")
    private Timestamp updateAt;

    @Column(name = "views")
    private Long views;
}