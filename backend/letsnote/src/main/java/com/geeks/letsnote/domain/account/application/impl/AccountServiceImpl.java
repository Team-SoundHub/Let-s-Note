package com.geeks.letsnote.domain.account.application.impl;

import com.geeks.letsnote.domain.account.application.AccountService;
import com.geeks.letsnote.domain.account.dao.AccountRepository;
import com.geeks.letsnote.domain.account.entity.Account;
import com.geeks.letsnote.domain.account.entity.AccountAdapter;
import com.geeks.letsnote.domain.account.entity.Authority;
import com.geeks.letsnote.domain.account.dto.RequestAccount;
import com.geeks.letsnote.domain.account.dto.ResponseAccount;
import com.geeks.letsnote.global.exception.ApplicationException;
import com.geeks.letsnote.global.exception.CommonErrorCode;
import com.geeks.letsnote.global.security.AccessTokenProvider;
import com.geeks.letsnote.global.security.RefreshTokenProvider;
import com.geeks.letsnote.global.security.exception.AccountErrorCode;
import com.geeks.letsnote.global.security.utility.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccessTokenProvider accessTokenProvider;
    private final RefreshTokenProvider refreshTokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final SecurityUtil securityUtil;

    @Override
    public ResponseAccount.Token authenticate(String username, String password) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(username, password);

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        String accessToken = accessTokenProvider.createToken(authentication);

        Long tokenWeight = ((AccountAdapter)authentication.getPrincipal()).getAccount().getTokenWeight();
        String refreshToken = refreshTokenProvider.createToken(authentication, tokenWeight);
        Optional<Account> account = accountRepository.findByUsername(username);

        return ResponseAccount.Token.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .accountId(account.get().getId())
                .build();
    }

    @Transactional(readOnly = true)
    @Override
    public ResponseAccount.Token refreshToken(String refreshToken) {
        if(!refreshTokenProvider.validateToken(refreshToken)) throw new ApplicationException(AccountErrorCode.INVALID_REFRESH_TOKEN);

        Authentication authentication = refreshTokenProvider.getAuthentication(refreshToken);
        Account account = accountRepository.findOneWithAuthoritiesByUsername(authentication.getName())
                .orElseThrow(()-> new UsernameNotFoundException(authentication.getName() + "을 찾을 수 없습니다"));
        if(account.getTokenWeight() > refreshTokenProvider.getTokenWeight(refreshToken)) throw new ApplicationException(AccountErrorCode.INVALID_REFRESH_TOKEN);

        String accessToken = accessTokenProvider.createToken(authentication);
        return ResponseAccount.Token.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    @Transactional
    @Override
    public void invalidateRefreshTokenByUsername(String username) {
        Account account = accountRepository.findOneWithAuthoritiesByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username + "-> 찾을 수 없습니다"));
        account.increaseTokenWeight();
    }

    @Transactional
    @Override
    public ResponseAccount.Information registerMember(RequestAccount.RegisterMember registerMemberDto) {
        Optional<Account> accountOptional = accountRepository.findOneWithAuthoritiesByUsername(
                registerMemberDto.username());

        if (accountOptional.isPresent()) {
            throw new ApplicationException(CommonErrorCode.CONFLICT, "이미 가입되어있는 유저");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_MEMBER")
                .build();

        Account user = Account.builder()
                .username(registerMemberDto.username())
                .password(passwordEncoder.encode(registerMemberDto.password()))
                .nickname(registerMemberDto.nickname())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();

        return ResponseAccount.Information.of(accountRepository.save(user));
    }

    @Transactional
    @Override
    public ResponseAccount.Information registerAdmin(RequestAccount.RegisterAdmin registerAdminDto) {
        Optional<Account> accountOptional = accountRepository.findOneWithAuthoritiesByUsername(
                registerAdminDto.username());

        if (accountOptional.isPresent()) {
            throw new ApplicationException(CommonErrorCode.CONFLICT, "이미 가입되어있는 유저");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_ADMIN")
                .build();

        Account user = Account.builder()
                .username(registerAdminDto.username())
                .password(passwordEncoder.encode(registerAdminDto.password()))
                .nickname(registerAdminDto.nickname())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();

        return ResponseAccount.Information.of(accountRepository.save(user));
    }

    @Transactional(readOnly = true)
    @Override
    public ResponseAccount.Information getAccountWithAuthorities(String username) {
        Account account = accountRepository.findOneWithAuthoritiesByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username + "-> 찾을 수 없습니다"));
        return ResponseAccount.Information.of(account);
    }

    @Transactional(readOnly = true)
    @Override
    public ResponseAccount.Information getMyAccountWithAuthorities() {
        Account account = securityUtil.getCurrentUsername()
                .flatMap(accountRepository::findOneWithAuthoritiesByUsername)
                .orElseThrow(() -> new UsernameNotFoundException("security context로부터 찾을 수 없습니다"));
        return ResponseAccount.Information.of(account);
    }

    @Transactional
    @Override
    public void UpdateAccountRefreshToken(String username, String refreshToken) {
        var account = accountRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username + "-> 찾을 수 없습니다"));
        account.updateRefreshToken(refreshToken);
    }

    @Override
    public boolean refreshTokenValidationCheck(String refreshToken) {
        String username = refreshTokenProvider.getUsernameFromToken(refreshToken);
        return accountRepository.existsByUsernameAndRefreshToken(username, refreshToken);
    }

    @Override
    public ResponseAccount.NickName getNicknameFromAccountId(Long accountId) {
        return new ResponseAccount.NickName(accountRepository.findOneNicknameById(accountId));
    }

    @Override
    public ResponseAccount.AccountId getAccountIdFromUserName(String username) {
        return new ResponseAccount.AccountId(accountRepository.findAccountIdByUsername(username));
    }

    @Override
    public boolean checkPathVariableWithTokenUser(Long accountId) {
        Optional<Account> checkAccount = accountRepository.findById(accountId);
        if(checkAccount.isEmpty()){
            return false;
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User userPrincipal = (User) authentication.getPrincipal();
        return userPrincipal.getUsername().equals(checkAccount.get().getUsername()) ? true : false;
    }

    @Override
    public Optional<Account> getAccountFromUserId(String userId) {
        Optional<Account> user = accountRepository.findByUsername(userId);
        if(user.isPresent()){
            return user;
        }
        return null;
    }

    @Override
    public ResponseAccount.Username getUsernameFromAccountId(Long accountId) {
        Optional<Account> user = accountRepository.findById(accountId);
        if(user.isPresent()) {
            ResponseAccount.Username username = ResponseAccount.Username.builder()
                    .username(user.get().getUsername())
                    .build();

            return username;
        }
        return null;
    }
}