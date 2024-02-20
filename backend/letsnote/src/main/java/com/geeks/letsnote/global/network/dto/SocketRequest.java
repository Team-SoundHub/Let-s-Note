package com.geeks.letsnote.global.network.dto;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

public record SocketRequest() {

	@Builder
	public record Coordinate(
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
			String spaceId,
			@NotNull
			Long accountId,
			@NotNull
			String msgContent
	){
	}
	@Builder
	public record SpaceInstrument(
			@NotNull
			String spaceId,
			@NotNull
			Instrument instrument
	){}

	@Builder
	public record MousePosition(
			Integer x,
			Integer y,
			Long accountId,
			String spaceId
	) {
	}

	@Builder
	public record LoopStatus(
			String instrument,
			Integer spaceLength
	) {
	}

	@Builder
	public record Note(
			Integer x,
			Integer y
	){}
}
