package com.geeks.letsnote.global.network.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

public record SocketRequest() {

	@Builder
	public record content(
			@NotNull
			String instrument,
			@NotNull
			Integer x,
			@NotNull
			Integer y
	){
	}
}
