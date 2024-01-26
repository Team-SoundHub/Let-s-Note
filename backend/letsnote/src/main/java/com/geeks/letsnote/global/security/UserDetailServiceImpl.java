package com.geeks.letsnote.global.security;

import com.geeks.letsnote.domain.account.dao.AccountRepository;
import com.geeks.letsnote.domain.account.domain.Account;
import com.geeks.letsnote.domain.account.domain.AccountAdapter;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    private final AccountRepository accountRepository;

    public UserDetailServiceImpl(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) {
        Account account = accountRepository.findOneWithAuthoritiesByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다."));

        if(!account.isActivated()) throw new RuntimeException(account.getUsername() + " -> 활성화되어 있지 않습니다.");
        return new AccountAdapter(account);
    }
}
