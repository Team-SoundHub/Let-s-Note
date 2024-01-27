package com.geeks.letsnote.domain.account.exception;

public class RefreshTokenValidationException extends RuntimeException {
    public RefreshTokenValidationException(String message) {
        super(message);
    }
}