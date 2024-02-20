package com.geeks.letsnote.domain.studio.workSpace.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "workspace_member_map")
@Getter
@NoArgsConstructor
public class WorkspaceMemberMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "map_id")
    private Long mapId;

    @Column(name = "space_id", nullable = false)
    private String spaceId;

    @Column(name = "account_id",nullable = false)
    private Long accountId;

    @Builder
    public WorkspaceMemberMap(Long mapId, String spaceId, Long accountId) {
        this.mapId = mapId;
        this.spaceId = spaceId;
        this.accountId = accountId;
    }
}
