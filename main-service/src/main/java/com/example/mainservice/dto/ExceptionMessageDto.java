package com.example.mainservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Data
public class ExceptionMessageDto {
    private String message;
    private HttpStatus httpStatus;
//    private List<ApiSubError> subErrors;
}
