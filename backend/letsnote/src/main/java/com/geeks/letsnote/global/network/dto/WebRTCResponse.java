package com.geeks.letsnote.global.network.dto;

import lombok.Builder;

import java.util.List;
import java.util.Set;

public record WebRTCResponse() {
    @Builder
    public record Offer(
            String sdp,
            String offerSendId

    ){}

    @Builder
    public record AllUsers(
            Set<User> allUsers
    ){}

    @Builder
    public record User(
            String userId
    ){}

    @Builder
    public record Answer(
            String sdp,
            String answerSendId
    ){}

    @Builder
    public record Candidate(
            String candidate,
            String candidateSendId
    ){}

    @Builder
    public record ExitUser(
            String exitUserId
    ) {}
}
