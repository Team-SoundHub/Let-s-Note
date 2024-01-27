package com.geeks.letsnote.domain.message.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "message")
@Getter
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long messageId;

    @Column(name = "space_id" , nullable = false)
    private Long spaceId;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "msg_content", nullable = false)
    private String msgContent;

    @Column(name = "timestamp")
    private Timestamp timestamp;
}
