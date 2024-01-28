package com.geeks.letsnote.domain.studio.workSpace.dao;

import com.geeks.letsnote.domain.studio.workSpace.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {
    Optional<Note> findBySpaceInstrument(String mapId);

    List<Note> findAllBySpaceInstrument(String mapId);
}
