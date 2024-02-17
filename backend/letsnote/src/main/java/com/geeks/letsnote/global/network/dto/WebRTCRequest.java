package com.geeks.letsnote.global.network.dto;

import lombok.Builder;

public record WebRTCRequest() {

    @Builder
    public record Offer(
            String sdp,
            String offerSendId,
            String offerReceiveId
    ) {}

    @Builder
    public record JoinAccount(
            String userId,
            String spaceId
    ) {}

    @Builder
    public record Answer(
            String sdp,
            String answerSendId,
            String answerReceiveId
    ){
    }

    @Builder
    public record Candidate(
            String candidate,
            String candidateSendId,
            String candidateReceiveId
    ) {
    }

    @Builder
    public record ExitUser(
            String exitUserId
    ) {
    }
}
