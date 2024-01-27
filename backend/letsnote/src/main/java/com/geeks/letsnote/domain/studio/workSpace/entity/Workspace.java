package com.geeks.letsnote.domain.studio.workSpace.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "workspace")
@Getter
@NoArgsConstructor
public class Workspace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "space_id")
    private Long spaceId;

    @Column(name = "owner_id", nullable = false)
    private Long ownerId;

    @Column(name = "update_at")
    private Timestamp updateAt;

    @Column(name = "space_title" , length = 30)
    private String spaceTitle;

    @Column(name = "space_content", length = 255)
    private String spaceContent;
}
