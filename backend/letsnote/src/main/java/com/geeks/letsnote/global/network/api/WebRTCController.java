package com.geeks.letsnote.global.network.api;

import com.geeks.letsnote.global.network.dto.WebRTCRequest;
import com.geeks.letsnote.global.network.dto.WebRTCResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebRTCController {
    private final HashMap<String, Map<String, String>> accountConnectedSessions = EditorSocketController.accountConnectedSessions;
    private final SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/webrtc/{spaceId}/join")
    public void sendJoin(@Valid @Payload WebRTCRequest.JoinAccount joinAccount, @DestinationVariable String spaceId, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        String senderSession = headerAccessor.getUser().getName();
        List<String> allUsers = new ArrayList<>();
        for(Map.Entry<String, String> entry : accountConnectedSessions.get(spaceId).entrySet()) {
            allUsers.add(entry.getValue());
        }
        simpMessagingTemplate.convertAndSendToUser(senderSession, "/topic/webrtc/"+spaceId+"/join", new WebRTCResponse.AllUsers(allUsers));
    }

    @MessageMapping("/webrtc/{spaceId}/offer/sendOffer")
    public void sendOffer(@Valid @Payload WebRTCRequest.Offer offer, @DestinationVariable String spaceId, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        for(Map.Entry<String, String> entry : accountConnectedSessions.get(spaceId).entrySet()) {
            if(entry.getValue().equals(offer.offerReceiveId())){
                simpMessagingTemplate.convertAndSendToUser(entry.getKey(), "/topic/webrtc/"+spaceId+"/getOffer", new WebRTCResponse.Offer(offer.sdp(),offer.offerSendId()));
            }
        }
    }

    @MessageMapping("/webrtc/{spaceId}/answer/sendAnswer")
    public void sendAnswer(@Valid @Payload WebRTCRequest.Answer answer, @DestinationVariable String spaceId, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        for(Map.Entry<String, String> entry : accountConnectedSessions.get(spaceId).entrySet()) {
            if(entry.getValue().equals(answer.answerReceiveId())){
                simpMessagingTemplate.convertAndSendToUser(entry.getKey(), "/topic/webrtc/"+spaceId+"/getAnswer", new WebRTCResponse.Answer(answer.sdp(),answer.answerSendId()));
            }
        }
    }

    @MessageMapping("/webrtc/{spaceId}/candidate/sendCandidate")
    public void sendCandidate(@Valid @Payload WebRTCRequest.Candidate candidate, @DestinationVariable String spaceId, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        for(Map.Entry<String, String> entry : accountConnectedSessions.get(spaceId).entrySet()) {
            if(entry.getValue().equals(candidate.candidateReceiveId())){
                simpMessagingTemplate.convertAndSendToUser(entry.getKey(), "/topic/webrtc/"+spaceId+"/getCandidate", new WebRTCResponse.Candidate(candidate.candidate(),candidate.candidateSendId()));
            }
        }
    }

    @MessageMapping("/webrtc/{spaceId}/exit/sendExit")
    @SendTo("/topic/webrtc/{spaceId}/user/exit")
    public WebRTCResponse.ExitUser sendUserExit(@Valid @Payload WebRTCRequest.ExitUser user, @DestinationVariable String spaceId) throws Exception {
        return new WebRTCResponse.ExitUser(user.exitUserId());
    }

}
