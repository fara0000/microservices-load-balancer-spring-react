package com.example.mainservice.dto.requests;

import lombok.Data;

@Data
public class CityUpdateRequestDTO {
    private Integer id;
    private CityRequestDTO body;
}
