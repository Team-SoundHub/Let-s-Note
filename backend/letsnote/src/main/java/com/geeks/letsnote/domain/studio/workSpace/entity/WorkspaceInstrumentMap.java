package com.geeks.letsnote.domain.studio.workSpace.entity;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "workspace_instrument_map")
@Getter
@NoArgsConstructor
public class WorkspaceInstrumentMap {
    @Id
    @Column(name = "map_id")
    private String mapId;

    @Column(name = "space_id")
    private String spaceId;

    @Enumerated(EnumType.STRING)
    @Column(name = "instrument", nullable = false)
    private Instrument instrument;


    @Builder
    public WorkspaceInstrumentMap(String mapId, String spaceId, Instrument instrument) {
        this.mapId = mapId;
        this.spaceId = spaceId;
        this.instrument = instrument;
    }
}
