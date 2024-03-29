package com.geeks.letsnote.global.network.dto;

import lombok.Builder;

import java.util.List;
import java.util.Set;

public record WebRTCResponse() {
    @Builder
    public record Offer(
            Object sdp,
            String offerSendId,
            String offerSenderNickname

    ){}

    @Builder
    public record AllUsers(
            Set<User> allUsers
    ){}

    @Builder
    public record User(
            String userId,
            String userNickname
    ){}

    @Builder
    public record Answer(
            Object sdp,
            String answerSendId
    ){}

    @Builder
    public record Candidate(
            Object candidate,
            String candidateSendId
    ){}

    @Builder
    public record ExitUser(
            String exitUserId
    ) {}
}
