package com.example.mainservice.dto.responses;

import com.example.mainservice.entities.City;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CityResponseDTO {
    private List<City> cities;
    private Integer count;
}
