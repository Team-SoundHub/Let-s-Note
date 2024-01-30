package com.geeks.letsnote.global.network.api;

import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.account.dto.ResponseAccount;
import com.geeks.letsnote.domain.message.application.MessageService;
import com.geeks.letsnote.domain.message.dto.MessageReqeust;
import com.geeks.letsnote.domain.message.dto.MessageResponse;
import com.geeks.letsnote.global.network.exception.CustomWebSocketHandlerDecorator;
import com.geeks.letsnote.global.network.dto.SocketRequest;
import com.geeks.letsnote.global.network.dto.SocketResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Controller;

import java.io.IOException;


@Slf4j
@Controller
@RequiredArgsConstructor
public class EditorSocketController {

	private final MessageService messageService;
	private final AccountService accountService;
	private final CustomWebSocketHandlerDecorator customWebSocketHandlerDecorator;

    @MessageMapping("/editor/coordinate")
	@SendTo("/topic/editor/coordinate")
	public SocketResponse.Content coordinateInfo(@Valid @Payload SocketRequest.Content content) throws Exception {
		return new SocketResponse.Content(content.instrument(), content.x(), content.y());
	}

	@MessageMapping("/chat/sendMessage")
	@SendTo("/topic/chat/public")
	public SocketResponse.Chat sendMessage(@Valid @Payload SocketRequest.Chat chatMessage) {
		MessageReqeust.information messageInfo = MessageReqeust.information.builder()
				.spaceId(chatMessage.spaceId())
				.accountId(chatMessage.accountId())
				.msgContent(chatMessage.msgContent())
				.build();
		MessageResponse.information result = messageService.createMessage(messageInfo);
		ResponseAccount.NickName nickName = accountService.getNicknameFromAccountId(chatMessage.accountId());
		return new SocketResponse.Chat(nickName.nickname(), result.msgContent(), result.timestamp());
	}

	@MessageMapping("/workspace/{workSpaceId}/join}")
	@SendTo("/topic/workspace/{workSpaceId}/join}")
	public SocketResponse.WorkSpace joinWorkSpace(@Valid @Header("accountId")Long accountId, @DestinationVariable String workSpaceId, StompHeaderAccessor stompHeaderAccessor) {
		return new SocketResponse.WorkSpace(workSpaceId);
	}

	@MessageExceptionHandler
	@SendToUser("/queue/errors")
	public String handleException(Throwable exception, StompHeaderAccessor stompHeaderAccessor) throws IOException {

		if (exception instanceof AccessDeniedException) {
			String sessionId = stompHeaderAccessor.getSessionId();
			log.info("session = {}, connection remove", sessionId);
			customWebSocketHandlerDecorator.closeSession(sessionId);
		}
//		사소한 예외일 경우 사용
//		else if (exception instanceof CommonException) {
//			return "server exception: " + exception.getMessage();
//		}
		else {
			String sessionId = stompHeaderAccessor.getSessionId();
			customWebSocketHandlerDecorator.closeSession(sessionId);
		}

		return "server exception: " + exception.getMessage() + "server session clear";
	}

}
