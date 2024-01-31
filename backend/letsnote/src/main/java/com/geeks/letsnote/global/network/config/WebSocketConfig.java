package com.geeks.letsnote.global.network.config;


import com.geeks.letsnote.global.network.exception.CustomWebSocketHandlerDecorator;
import com.geeks.letsnote.global.network.security.WebSocketSecurityInterceptor;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	private final WebSocketSecurityInterceptor webSocketSecurityInterceptor;

	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/letsnote/ws")
				.setAllowedOrigins("http://localhost:3000","https://www.letsnote.co.kr")
				.withSockJS();
	}

	@Override
	public void configureMessageBroker(MessageBrokerRegistry config) {
		config.enableSimpleBroker("/topic", "/queue");
		config.setApplicationDestinationPrefixes("/app");
	}

	@Override
	public void configureClientInboundChannel(ChannelRegistration registration) {
		registration.interceptors(webSocketSecurityInterceptor);
	}

	@Bean
	public CustomWebSocketHandlerDecorator customWebSocketHandlerDecorator(WebSocketHandler webSocketHandler) {
		return new CustomWebSocketHandlerDecorator(webSocketHandler);
	}

	@Override
	public void configureWebSocketTransport(WebSocketTransportRegistration registry) {
		registry.addDecoratorFactory(this::customWebSocketHandlerDecorator);
	}

}
