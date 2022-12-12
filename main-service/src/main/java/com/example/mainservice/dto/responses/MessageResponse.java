package com.example.mainservice.dto.responses;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;

@JsonSerialize
@Data
@AllArgsConstructor
public class MessageResponse {
    private String message;
    private Integer code;
}
