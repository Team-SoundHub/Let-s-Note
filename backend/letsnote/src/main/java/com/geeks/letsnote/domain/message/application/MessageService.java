package com.geeks.letsnote.domain.message.application;

import com.geeks.letsnote.domain.message.dto.MessageReqeust;
import com.geeks.letsnote.domain.message.dto.MessageResponse;

import java.util.List;

public interface MessageService {
    List<MessageResponse.information> getAllMessageBySpaceId(String spaceId);
    MessageResponse.information createMessage(MessageReqeust.information messageInfo);
}
