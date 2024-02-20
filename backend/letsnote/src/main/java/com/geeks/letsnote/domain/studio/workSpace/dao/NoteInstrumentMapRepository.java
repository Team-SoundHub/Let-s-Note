package com.geeks.letsnote.domain.studio.workSpace.dao;


import com.geeks.letsnote.domain.studio.instrument.Instrument;
import com.geeks.letsnote.domain.studio.workSpace.entity.NoteInstrumentMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteInstrumentMapRepository extends JpaRepository<NoteInstrumentMap,String> {
    List<NoteInstrumentMap> findAllBySpaceIdAndInstrument(String spaceId,Instrument instrument);

    Optional<NoteInstrumentMap> findBySpaceIdAndInstrument(String spaceId, Instrument instrument);
    @Query("SELECT m.mapId FROM NoteInstrumentMap m WHERE m.spaceId = :spaceId")
    List<String> findAllMapIdsBySpaceId(@Param("spaceId") String spaceId);
}
