package com.geeks.letsnote.domain.studio.snapshot.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "snapshot")
@Getter
@NoArgsConstructor
public class Snapshot {
    @Id
    @Column(name = "snapshot_id")
    private String snapshotId;

    @Column(name = "space_id", nullable = false)
    private String spaceId;

    @Column(name = "snapshot_title", nullable = false, length = 50)
    private String snapshotTitle;

    @Column(name = "snapshot_content", nullable = false, length = 255)
    private String snapshotContent;

    @Column(name = "update_at", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp updateAt;

    @Column(name = "views")
    private Long views;

    @Column (name = "snapshot_bpm")
    private Integer snapshotBpm;

    @Builder
    public Snapshot(String snapshotId, String spaceId, String snapshotTitle, String snapshotContent, Timestamp updateAt, Long views, Integer snapshotBpm) {
        this.snapshotId = snapshotId;
        this.spaceId = spaceId;
        this.snapshotTitle = snapshotTitle;
        this.snapshotContent = snapshotContent;
        this.updateAt = updateAt;
        this.views = views;
        this.snapshotBpm = snapshotBpm;
    }
}