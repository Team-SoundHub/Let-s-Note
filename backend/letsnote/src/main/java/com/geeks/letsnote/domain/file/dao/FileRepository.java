package com.geeks.letsnote.domain.file.dao;

import com.geeks.letsnote.domain.file.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {
    List<File> findAllBySpaceId(String spaceId);
}
