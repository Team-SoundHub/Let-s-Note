package com.geeks.letsnote.domain.studio.workSpace.dao;

import com.geeks.letsnote.domain.studio.workSpace.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    Optional<Note> findBySpaceInstrument(String mapId);

    List<Note> findAllBySpaceInstrument(String mapId);

    Optional<Note> findBySpaceInstrumentAndNoteXAndNoteY(String mapId, Long noteX, Long noteY);

    @Transactional
    @Modifying
    @Query("DELETE FROM Note n WHERE n.spaceInstrument IN :noteInstrumentMapIds")
    void deleteAllBySpaceInstruments(@Param("noteInstrumentMapIds") List<String> noteInstrumentMapIds);

    @Transactional
    @Modifying
    @Query("DELETE FROM Note n WHERE n.spaceInstrument = :mapId")
    void deleteAllBySpaceInstrument(@Param("mapId")String mapId);
}
