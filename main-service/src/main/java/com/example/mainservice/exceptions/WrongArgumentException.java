package com.example.mainservice.exceptions;

public class WrongArgumentException extends IllegalArgumentException {
    public WrongArgumentException(String msg) {
        super(msg);
    }
}
