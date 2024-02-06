package com.geeks.letsnote.domain.file.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "account_file")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountFile {
    @Id
    @Column(name = "account_file_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountFileId;

    @Column(name = "file_url", length = 300)
    private String fileUrl;

    @Column(name = "account_id", length = 200)
    private Long accountId;

    @Column(name = "reg_date", nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp regDate;
}