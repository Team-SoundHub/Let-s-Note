package com.geeks.letsnote.domain.message.dao;

import com.geeks.letsnote.domain.message.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllBySpaceId(String spaceId);
}
