package com.geeks.letsnote.global.network.dto;

import lombok.Builder;

public record WebRTCRequest() {

    @Builder
    public record Offer(
            Object sdp,
            String offerSendId,
            String offerReceiveId,
            String offerSenderNickname
    ) {}

    @Builder
    public record JoinAccount(
            String userId,
            String spaceId
    ) {}

    @Builder
    public record Answer(
            Object sdp,
            String answerSendId,
            String answerReceiveId
    ){
    }

    @Builder
    public record Candidate(
            Object candidate,
            String candidateSendId,
            String candidateReceiveId
    ) {
    }

    @Builder
    public record ExitUser(
            String userId
    ) {
    }
}
