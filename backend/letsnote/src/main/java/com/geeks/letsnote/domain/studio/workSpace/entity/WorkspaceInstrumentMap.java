package com.geeks.letsnote.domain.studio.workSpace.entity;

import com.geeks.letsnote.domain.studio.instrument.Instrument;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "workspace_instrument_map")
@Getter
@NoArgsConstructor
public class WorkspaceInstrumentMap {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "map_id")
    private Long mapId;

    @Column(name = "space_id")
    private Long spaceId;

    @Enumerated(EnumType.STRING)
    @Column(name = "instrument", nullable = false)
    private Instrument instrument;
}
