package com.geeks.letsnote.domain.studio.instrument;

public enum Instrument {
    Piano("piano"),
    Guitar("guitar"),
    Drum("drum"),
    All("all");

    private final String value;

    Instrument(String value) {
        this.value = value;
    }

    public static Instrument fromString(String value) {
        for (Instrument instrument : Instrument.values()) {
            if (instrument.value.equalsIgnoreCase(value)) {
                return instrument;
            }
        }
        throw new IllegalArgumentException("No constant with value " + value + " found in Instrument enum");
    }
}
