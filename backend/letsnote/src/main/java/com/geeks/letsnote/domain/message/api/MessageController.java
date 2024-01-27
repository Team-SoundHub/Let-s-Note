package com.geeks.letsnote.domain.message.api;

import com.geeks.letsnote.domain.message.application.MessageService;
import com.geeks.letsnote.domain.message.dto.MessageReqeust;
import com.geeks.letsnote.domain.message.dto.MessageResponse;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "메세지 API", description = "메세지 관련 API 입니다.")
@RestController
@RequestMapping("/api/v1/messages")
public class MessageController {
    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @Operation(summary = "모든 메세지 출력", description = "SpaceId에 해당하는 모든 메세지를 리턴합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = MessageResponse.information.class)))
    })
    @GetMapping("/{spaceId}")
    public ResponseEntity<CommonResponse> getAllMessage(@PathVariable String spaceId){
        List<MessageResponse.information> messageInfo = messageService.getAllMessageBySpaceId(spaceId);
        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response(messageInfo)
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Operation(summary = "메세지 저장", description = "AccountId로 특정 메세지를 저장합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK")
    })
    @PostMapping("/{accountId}")
    public ResponseEntity<CommonResponse> createMessage(@RequestBody MessageReqeust.information messageInfo){
        messageService.createMessage(messageInfo);

        CommonResponse response = CommonResponse.builder()
                .success(true)
                .response("")
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }




}
