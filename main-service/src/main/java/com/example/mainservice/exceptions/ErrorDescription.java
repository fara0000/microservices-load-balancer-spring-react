package com.example.mainservice.exceptions;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import javax.lang.model.type.ErrorType;

@Getter
@RequiredArgsConstructor
public class ErrorDescription {
    /**
     * Тип ошибки.
     */
    private final ErrorType type;

    /**
     * Код ошибки.
     */
    private final String code;

    /**
     * Сообщение ошибки.
     */
    private final String message;

}
