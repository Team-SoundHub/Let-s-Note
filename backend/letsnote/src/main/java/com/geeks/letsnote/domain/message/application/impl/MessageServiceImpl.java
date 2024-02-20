package com.geeks.letsnote.domain.message.application.impl;

import com.geeks.letsnote.domain.message.application.MessageService;
import com.geeks.letsnote.domain.message.dao.MessageRepository;
import com.geeks.letsnote.domain.message.dto.MessageReqeust;
import com.geeks.letsnote.domain.message.dto.MessageResponse;
import com.geeks.letsnote.domain.message.entity.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Component
@RequiredArgsConstructor
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;

    @Transactional
    @Override
    public List<MessageResponse.information> getAllMessageBySpaceId(String spaceId) {
        List<Message> messageList = messageRepository.findAllBySpaceId(spaceId);
        List<MessageResponse.information> messageResponseList = new ArrayList<>();
        for(Message message : messageList){
            MessageResponse.information messageInfo = MessageResponse.information.builder()
                    .accountId(message.getAccountId())
                    .msgContent(message.getMsgContent())
                    .timestamp(message.getTimestamp())
                    .build();
            messageResponseList.add(messageInfo);
        }
        return messageResponseList;
    }

    @Transactional
    @Override
    public MessageResponse.information createMessage(MessageReqeust.information messageInfo) {
        Message message = Message.builder().
                accountId(messageInfo.accountId()).
                msgContent(messageInfo.msgContent()).
                spaceId(messageInfo.spaceId()).
                build();
        Message result = messageRepository.save(message);

        return new MessageResponse.information(result.getAccountId(), result.getMsgContent(), result.getTimestamp());
    }
}
