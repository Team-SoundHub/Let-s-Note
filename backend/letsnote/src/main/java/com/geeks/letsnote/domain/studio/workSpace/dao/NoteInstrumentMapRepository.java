package com.geeks.letsnote.domain.studio.workSpace.dao;


import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.workSpace.entity.NoteInstrumentMap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NoteInstrumentMapRepository extends JpaRepository<NoteInstrumentMap,String> {
    List<NoteInstrumentMap> findAllBySpaceIdAndInstrument(String spaceId,Instrument instrument);

    NoteInstrumentMap findBySpaceIdAndInstrument(String spaceId, Instrument instrument);
}
