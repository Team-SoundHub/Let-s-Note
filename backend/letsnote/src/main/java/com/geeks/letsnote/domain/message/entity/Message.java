package com.geeks.letsnote.domain.message.entity;

import jakarta.persistence.*;
import lombok.Builder;
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
    private String spaceId;

    @Column(name = "account_id", nullable = false)
    private Long accountId;

    @Column(name = "msg_content", nullable = false)
    private String msgContent;

    @Column(nullable = false, updatable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private Timestamp timestamp;

    @Builder
    public Message(Long messageId, String spaceId, Long accountId, String msgContent) {
        this.messageId = messageId;
        this.spaceId = spaceId;
        this.accountId = accountId;
        this.msgContent = msgContent;
    }
}
