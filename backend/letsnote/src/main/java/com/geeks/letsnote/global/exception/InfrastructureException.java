package com.geeks.letsnote.global.exception;

import lombok.Getter;
import org.springframework.web.server.ResponseStatusException;

@Getter
public class InfrastructureException extends ResponseStatusException {

    private final CommonErrorCode errorCode;

    public InfrastructureException(CommonErrorCode errorCode) {
        super(errorCode.getHttpStatus(), errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public InfrastructureException(CommonErrorCode errorCode, String message) {
        super(errorCode.getHttpStatus(), message);
        this.errorCode = errorCode;
    }
}
