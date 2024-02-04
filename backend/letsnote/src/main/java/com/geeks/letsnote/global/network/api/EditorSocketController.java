package com.geeks.letsnote.global.network.api;

import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.account.dto.ResponseAccount;
import com.geeks.letsnote.domain.message.application.MessageService;
import com.geeks.letsnote.domain.message.dto.MessageReqeust;
import com.geeks.letsnote.domain.message.dto.MessageResponse;
import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.workSpace.application.NoteInstrumentMapService;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import com.geeks.letsnote.domain.studio.workSpace.dto.RequestNotes;
import com.geeks.letsnote.global.network.exception.CustomWebSocketHandlerDecorator;
import com.geeks.letsnote.global.network.dto.SocketRequest;
import com.geeks.letsnote.global.network.dto.SocketResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Controller;

import java.io.IOException;


@Slf4j
@Controller
@RequiredArgsConstructor
public class EditorSocketController {

	private final MessageService messageService;
	private final AccountService accountService;
	private final NoteInstrumentMapService noteInstrumentMapService;
	private final CustomWebSocketHandlerDecorator customWebSocketHandlerDecorator;
	private final WorkspaceService workspaceService;

    @MessageMapping("/editor/coordinate")
	@SendTo("/topic/editor/coordinate")
	public SocketResponse.Coordinate coordinateInfo(@Valid @Payload SocketRequest.Coordinate coordinate) {
//		String spaceId = "2d92f8cb4ff848308a2a953e5b9b3966";
		RequestNotes.NoteDto noteDto = RequestNotes.NoteDto.builder()
				.noteX(coordinate.x())
				.noteY(coordinate.y())
				.instrument(Instrument.fromString(coordinate.instrument())).build();
		noteInstrumentMapService.clickNoteMap(coordinate);
		return new SocketResponse.Coordinate(coordinate.spaceId(), coordinate.instrument(), coordinate.x(), coordinate.y());
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
		return new SocketResponse.Chat(chatMessage.spaceId(), nickName.nickname(), result.msgContent(), result.timestamp());
	}

	@MessageMapping("/workspace/{spaceId}/join}")
	@SendTo("/topic/workspace/{spaceId}/join}")
	public SocketResponse.WorkSpace joinWorkSpace(@Valid @Header("accountId")Long accountId, @DestinationVariable String spaceId, StompHeaderAccessor stompHeaderAccessor) {
		return new SocketResponse.WorkSpace(spaceId);
	}

	@MessageMapping("/workspace/{spaceId}/chat/sendMessage")
	@SendTo("/topic/workspace/{spaceId}/chat/public")
	public SocketResponse.Chat sendWorkSpaceMessage(
			@Valid @Payload SocketRequest.Chat chatMessage,
			@DestinationVariable String spaceId) {

		MessageReqeust.information messageInfo = MessageReqeust.information.builder()
				.spaceId(spaceId)
				.accountId(chatMessage.accountId())
				.msgContent(chatMessage.msgContent())
				.build();
		MessageResponse.information result = messageService.createMessage(messageInfo);
		ResponseAccount.NickName nickName = accountService.getNicknameFromAccountId(chatMessage.accountId());

		return new SocketResponse.Chat(spaceId, nickName.nickname(), result.msgContent(), result.timestamp());
	}

	@MessageMapping("/workspace/{spaceId}/editor/sendCoordinate")
	@SendTo("/topic/workspace/{spaceId}/editor/public")
	public SocketResponse.Coordinate sendEditorCoordinateInfo(@Valid @Payload SocketRequest.Coordinate content, @DestinationVariable String spaceId) throws Exception {
		noteInstrumentMapService.clickNoteMap(content);

		return new SocketResponse.Coordinate(spaceId, content.instrument(), content.x(), content.y());
	}

	@MessageMapping("/workspace/{spaceId}/mouse/sendMousePosition")
	@SendTo("/topic/workspace/{spaceId}/mouse/public")
	public SocketResponse.MousePosition sendMousePosition(@Valid @Payload SocketRequest.MousePosition mousePosition, @DestinationVariable String spaceId) throws Exception {
		ResponseAccount.NickName nickname = accountService.getNicknameFromAccountId(mousePosition.accountId());
		return new SocketResponse.MousePosition(mousePosition.x(), mousePosition.y(), mousePosition.accountId(),nickname.nickname());
	}

	@MessageMapping("/workspace/{spaceId}/loop/sendLoop")
	@SendTo("/topic/workspace/{spaceId}/loop/public")
	public SocketResponse.LoopNotes sendLoop(@Valid @Payload SocketRequest.LoopStatus loopStatus, @DestinationVariable String spaceId) throws Exception {
		SocketResponse.LoopNotes loopNotes = workspaceService.makeLoop(loopStatus, spaceId);
		if(loopNotes == null){
			return null;
		}
		return loopNotes;
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
