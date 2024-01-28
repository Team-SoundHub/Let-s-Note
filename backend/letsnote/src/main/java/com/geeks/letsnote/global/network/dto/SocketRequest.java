package com.geeks.letsnote.global.network.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

public record SocketRequest() {

	@Builder
	public record content(
			@NotNull
			String userName,
			@NotNull
			String instrument,
			@NotNull
			Integer x,
			@NotNull
			Integer y
	){
	}
	@Builder
	public record chat(
			@NotNull
			Long accountId,
			@NotNull
			String msgContent
	){
	}
}
