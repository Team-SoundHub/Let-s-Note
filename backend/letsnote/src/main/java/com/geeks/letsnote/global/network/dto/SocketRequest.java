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

	public record MousePosition(
			double x,
			double y,
			Long accountId
	) {
	}
}
