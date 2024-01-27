package com.geeks.letsnote.domain.studio.workSpace.entity;

import jakarta.persistence.*;
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
    private Long spaceId;

    @Column(name = "account_id",nullable = false)
    private Long accountId;
}
