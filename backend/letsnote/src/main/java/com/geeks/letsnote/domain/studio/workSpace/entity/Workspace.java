package com.geeks.letsnote.domain.studio.workSpace.entity;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "workspace")
@Getter
@NoArgsConstructor
public class Workspace {
    @Id
    @Column(name = "space_id")
    private String spaceId;

    @Column(name = "owner_id", nullable = false)
    private Long ownerId;

    @Column(name = "update_at", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp updateAt;

    @Column(name = "space_title" , length = 30)
    private String spaceTitle;

    @Column(name = "space_content", length = 255)
    private String spaceContent;

    @Column(name = "snapshot_count")
    private Integer snapshotCount;

    @Column(name = "workspace_bpm")
    private Integer workspaceBpm;

    @Builder
    public Workspace(String spaceId, Long ownerId, Timestamp updateAt, String spaceTitle, String spaceContent, Integer snapshotCount, Integer workspaceBpm) {
        this.spaceId = spaceId;
        this.ownerId = ownerId;
        this.updateAt = updateAt;
        this.spaceTitle = spaceTitle;
        this.spaceContent = spaceContent;
        this.snapshotCount = snapshotCount;
        this.workspaceBpm = workspaceBpm;
    }
}
