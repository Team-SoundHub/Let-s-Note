package com.geeks.letsnote.domain.file.dao;

import com.geeks.letsnote.domain.file.entity.AccountFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountFileRepository extends JpaRepository<AccountFile, Long> {
    AccountFile findByAccountId(Long accountId);
}
