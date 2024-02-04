package com.geeks.letsnote.global.network.security;

import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.account.dto.ResponseAccount;
import com.geeks.letsnote.domain.studio.workSpace.application.WorkspaceMemberMapService;
import com.geeks.letsnote.global.security.AccessTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;


@Slf4j
@RequiredArgsConstructor
@Component
public class WebSocketSecurityInterceptor implements ChannelInterceptor {

    private final AccountService accountService;
    private final WorkspaceMemberMapService workspaceMemberMapService;
    private final AntPathMatcher antPathMatcher;
    private final AccessTokenProvider accessTokenProvider;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        try {
        StompHeaderAccessor headerAccessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())){
            headerAccessor.setUser(new AccountPrinciple(headerAccessor.getSessionId()));
            isValidateSpaceIdAndAccountId(headerAccessor);
        }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return message;
    }

    private void isValidateSpaceIdAndAccountId(StompHeaderAccessor headerAccessor) {
        String accessToken = headerAccessor.getFirstNativeHeader("accessToken");
        String spaceId = headerAccessor.getFirstNativeHeader("spaceId");
        String accountId = headerAccessor.getFirstNativeHeader("accountId");

        if (accessToken == null || spaceId == null || accountId == null)
            throw new AccessDeniedException("AccessDenied");

        validateAccountAccessor(validateTokenAccessor(accessToken), Long.valueOf(accountId));

//        String destination = headerAccessor.getDestination();
//        String destination = "4";
//        log.info("destination = {}", destination);
//        log.info("destination >>");
//        if (destination == null) throw new AccessDeniedException("AccessDenied");

//        if (isApplyUri(destination)) {
//            log.info("isJoinedMember >>");
//            workspaceMemberMapService.isAccountIdInWorkSpace(destination, Long.valueOf(accountId));
//        }

    }

    private Long validateTokenAccessor(String accessToken) {
        try {
            String username = accessTokenProvider.getUsernameFromToken(accessToken);
            ResponseAccount.AccountId accountId = accountService.getAccountIdFromUserName(username);

            return accountId.accountId();
        } catch (Exception e) {
            throw new AccessDeniedException("AccessDenied");
        }
    }

    private boolean isApplyUri(String destination) {
        return !antPathMatcher.match("/app/workspace/**/join", destination);
    }

    private void validateAccountAccessor(Long parseAccountId, Long headerAccountId) {
        if (!parseAccountId.equals(headerAccountId)) throw new AccessDeniedException("AccessDenied");
    }
}
