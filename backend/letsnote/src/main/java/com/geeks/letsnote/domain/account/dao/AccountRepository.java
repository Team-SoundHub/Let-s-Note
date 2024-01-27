package com.geeks.letsnote.domain.account.dao;

import com.geeks.letsnote.domain.account.entity.Account;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    @EntityGraph(attributePaths = "authorities")
    Optional<Account> findOneWithAuthoritiesByUsername(String username);

    boolean existsByUsernameAndRefreshToken(String username, String refreshToken);

    Optional<Account> findByUsername(String username);

}