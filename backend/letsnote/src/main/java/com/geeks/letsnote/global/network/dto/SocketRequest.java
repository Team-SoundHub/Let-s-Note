package com.geeks.letsnote.global.network.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

public record SocketRequest() {

	@Builder
	public record Content(
			@NotNull
			String spaceId,
			@NotNull
			String instrument,
			@NotNull
			Integer x,
			@NotNull
			Integer y
	){
	}
	@Builder
	public record Chat(
			@NotNull
			Long accountId,
			@NotNull
			String msgContent
	){
	}
}
