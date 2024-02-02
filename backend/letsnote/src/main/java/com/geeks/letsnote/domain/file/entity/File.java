package com.geeks.letsnote.domain.file.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "file")
@Getter
@NoArgsConstructor
public class File {
    @Id
    @Column(name = "file_id")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long fileId;

    @Column(name = "file_url", length = 300, unique = true)
    private String fileUrl;

    @Column(name = "account_id", length = 50)
    private String accountId;
}