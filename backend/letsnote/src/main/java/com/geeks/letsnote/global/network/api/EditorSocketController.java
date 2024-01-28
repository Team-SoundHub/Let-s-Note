package com.geeks.letsnote.global.network.api;

import com.geeks.letsnote.global.network.dto.SocketRequest;
import com.geeks.letsnote.global.network.dto.SocketResponse;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

@Controller
public class EditorSocketController {

	private final Set<String> connectedUsers = new HashSet<>();
	@MessageMapping("/coordinate")
	@SendTo("/topic/editor/coordinate")
	public SocketResponse.content coordinateInfo(SocketRequest.content content) throws Exception {
		connectedUsers.remove(content.userName());
		Thread.sleep(100);

		for (String user : connectedUsers) {
			SocketResponse.content response = new SocketResponse.content(content.instrument(), content.x(), content.y());
		}

		// Add the sender back to the set
		connectedUsers.add(content.userName());

		return null;
	}

	@MessageMapping("/chat/sendMessage")
	@SendTo("/topic/chat/public")
	public SocketResponse.chat sendMessage(@Payload SocketRequest.chat chatMessage) {
		return new SocketResponse.chat(chatMessage.accountId(), chatMessage.msgContent());
	}

	@MessageMapping("/chat/addUser")
	@SendTo("/topic/chat/public")
	public SocketResponse.chat addUser(@Payload SocketRequest.chat chatMessage,
									   SimpMessageHeaderAccessor headerAccessor) {

		headerAccessor.getSessionAttributes().put("username", chatMessage.accountId());
		return new SocketResponse.chat(chatMessage.accountId(), chatMessage.msgContent());
	}


}
