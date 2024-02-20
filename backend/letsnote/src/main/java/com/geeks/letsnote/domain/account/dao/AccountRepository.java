package com.geeks.letsnote.domain.account.dao;

import com.geeks.letsnote.domain.account.entity.Account;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    @EntityGraph(attributePaths = "authorities")
    Optional<Account> findOneWithAuthoritiesByUsername(String username);

    boolean existsByUsernameAndRefreshToken(String username, String refreshToken);

    Optional<Account> findByUsername(String username);

    @Query("SELECT a.id FROM Account a WHERE a.username = :username")
    Long findAccountIdByUsername(@Param("username") String username);

    @Query("SELECT a.nickname FROM Account a WHERE a.id = :accountId")
    String findOneNicknameById(@Param("accountId") Long accountId);

    @Query("SELECT w.nickname FROM Account w WHERE w.id IN :accountIds")
    List<String> findMemberNickNamesFromAccountIds(@Param("accountIds")List<Long> accountIdsFromSpaceId);
}