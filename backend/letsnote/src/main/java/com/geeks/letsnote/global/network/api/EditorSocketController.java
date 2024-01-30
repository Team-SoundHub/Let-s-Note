package com.geeks.letsnote.global.network.api;

import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.account.dto.ResponseAccount;
import com.geeks.letsnote.domain.message.application.MessageService;
import com.geeks.letsnote.domain.message.dto.MessageReqeust;
import com.geeks.letsnote.domain.message.dto.MessageResponse;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceMemberMapService;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceService;
import com.geeks.letsnote.domain.studio.workSpace.dto.ResponseWorkspaces;
import com.geeks.letsnote.domain.studio.workSpace.entity.Workspace;
import com.geeks.letsnote.global.network.dto.SocketRequest;
import com.geeks.letsnote.global.network.dto.SocketResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class EditorSocketController {

	private final MessageService messageService;
	private final AccountService accountService;

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

}
