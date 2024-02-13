package com.geeks.letsnote.global.network.api;

import com.geeks.letsnote.global.network.dto.WebRTCRequest;
import com.geeks.letsnote.global.network.dto.WebRTCResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Controller
@RequiredArgsConstructor
public class WebRTCSignalingController {
    private final HashMap<String, Map<String, String>> accountConnectedSessions = EditorSocketController.accountConnectedSessions;
    private final SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/offer/{spaceId}")
    public void sendOffer (@Valid @Payload WebRTCRequest.Offer offer, @DestinationVariable String spaceId, SimpMessageHeaderAccessor headerAccessor) throws Exception {
        String senderSession = headerAccessor.getUser().getName();
        String senderId = accountConnectedSessions.get(spaceId).get(senderSession);
        for(Map.Entry<String, String> entry: accountConnectedSessions.get(spaceId).entrySet()) {
            if(!entry.getKey().equals(senderSession)) {
                simpMessagingTemplate.convertAndSendToUser(entry.getKey(), "/topic/offer/"+spaceId, new WebRTCResponse.Offer(senderId,offer.offer()));
            }
        }
    }
}
