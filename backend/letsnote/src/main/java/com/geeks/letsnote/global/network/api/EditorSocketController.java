package com.geeks.letsnote.global.network.api;

import com.geeks.letsnote.global.network.dto.SocketRequest;
import com.geeks.letsnote.global.network.dto.SocketResponse;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class EditorSocketController {

	@MessageMapping("/coordinate")
	@SendTo("/network/result")
	public SocketResponse.content coordinateInfo(SocketRequest.content content) throws Exception {
		Thread.sleep(100); // simulated delay
		return new SocketResponse.content(content.instrument(), content.x(), content.y());
	}

}
