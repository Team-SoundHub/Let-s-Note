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

//    @Query("SELECT e.nickname FROM account e WHERE e.id IN :ids")
    List<String> findNicknameByIdIn(@Param("ids") List<Long> ids);

    String findNicknameByUsername(String username);

    Long findIdByUsername(String username);

}