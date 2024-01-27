package com.geeks.letsnote.global.exception;

import com.geeks.letsnote.domain.account.exception.RefreshTokenValidationException;
import com.geeks.letsnote.global.security.dto.CommonResponse;
import com.geeks.letsnote.global.security.dto.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BindException.class)
    protected ResponseEntity<CommonResponse> handleParamViolationException(BindException ex) {
        CommonErrorCode commonErrorCode = CommonErrorCode.REQUEST_PARAMETER_BIND_FAILED;

        ErrorResponse error = ErrorResponse.builder()
                .status(commonErrorCode.getHttpStatus().value())
                .message(commonErrorCode.getMessage())
                .code(commonErrorCode.getCode())
                .build();

        CommonResponse response = CommonResponse.builder()
                .success(false)
                .error(error)
                .build();
        return new ResponseEntity<>(response, commonErrorCode.getHttpStatus());
    }

    @ExceptionHandler(ApplicationException.class)
    protected ResponseEntity<CommonResponse> handleApplicationException(ApplicationException ex) {
        BaseErrorCode errorCode = ex.getErrorCode();

        ErrorResponse error = ErrorResponse.builder()
                .status(errorCode.getHttpStatus().value())
                .message(errorCode.getMessage())
                .code(errorCode.getCode())
                .build();

        CommonResponse response = CommonResponse.builder()
                .success(false)
                .error(error)
                .build();
        return new ResponseEntity<>(response, errorCode.getHttpStatus());
    }

    @ExceptionHandler(InfrastructureException.class)
    protected ResponseEntity<CommonResponse> handleInfrastructureException(InfrastructureException ex) {
        BaseErrorCode errorCode = ex.getErrorCode();

        ErrorResponse error = ErrorResponse.builder()
                .status(errorCode.getHttpStatus().value())
                .message(errorCode.getMessage())
                .code(errorCode.getCode())
                .build();

        CommonResponse response = CommonResponse.builder()
                .success(false)
                .error(error)
                .build();
        return new ResponseEntity<>(response, errorCode.getHttpStatus());
    }

    @ExceptionHandler(DomainException.class)
    protected ResponseEntity<CommonResponse> handleDomainException(DomainException ex) {
        BaseErrorCode errorCode = CommonErrorCode.BAD_REQUEST;

        ErrorResponse error = ErrorResponse.builder()
                .status(errorCode.getHttpStatus().value())
                .message(errorCode.getMessage())
                .code(errorCode.getCode())
                .build();

        CommonResponse response = CommonResponse.builder()
                .success(false)
                .error(error)
                .build();
        return new ResponseEntity<>(response, errorCode.getHttpStatus());
    }

    @ExceptionHandler(RefreshTokenValidationException.class)
    protected ResponseEntity<CommonResponse> handleRefreshTokenValidationException(RefreshTokenValidationException ex) {
        CommonErrorCode commonErrorCode = CommonErrorCode.REFRESH_TOKEN_VALIDATION_FAILED;

        ErrorResponse error = ErrorResponse.builder()
                .status(commonErrorCode.getHttpStatus().value())
                .message(ex.getMessage())
                .code(commonErrorCode.getCode())
                .build();

        CommonResponse response = CommonResponse.builder()
                .success(false)
                .error(error)
                .build();
        return new ResponseEntity<>(response, commonErrorCode.getHttpStatus());
    }
}
