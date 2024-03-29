package com.geeks.letsnote.domain.account.application;

import com.geeks.letsnote.domain.account.dto.RequestAccount;
import com.geeks.letsnote.domain.account.dto.ResponseAccount;
import com.geeks.letsnote.domain.account.entity.Account;

import java.util.Optional;

public interface AccountService {
    ResponseAccount.Token authenticate(String username, String password);

    ResponseAccount.Token refreshToken(String refreshToken);

    void invalidateRefreshTokenByUsername(String username);

    ResponseAccount.Information registerMember(RequestAccount.RegisterMember registerMemberDto);

    ResponseAccount.Information registerAdmin(RequestAccount.RegisterAdmin registerAdminDto);

    ResponseAccount.Information getAccountWithAuthorities(String username);

    ResponseAccount.Information getMyAccountWithAuthorities();

    void UpdateAccountRefreshToken(String username, String refreshToken);

    boolean refreshTokenValidationCheck(String refreshToken);

    ResponseAccount.NickName getNicknameFromAccountId(Long accountId);

    ResponseAccount.AccountId getAccountIdFromUserName(String username);

    boolean checkPathVariableWithTokenUser(Long accountId);

    Optional<Account> getAccountFromUserId(String userId);

    ResponseAccount.Username getUsernameFromAccountId(Long accountId);

    String getNicknameFromUsername(String username);
}