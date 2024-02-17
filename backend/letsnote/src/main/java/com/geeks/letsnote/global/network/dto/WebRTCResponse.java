package com.geeks.letsnote.global.network.dto;

import lombok.Builder;

import java.util.List;

public record WebRTCResponse() {
    @Builder
    public record Offer(
            String sdp,
            String offerSendId

    ){}

    @Builder
    public record AllUsers(
            List<String> allUsers
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
