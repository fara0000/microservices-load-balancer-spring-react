package com.example.mainservice.dto.mappers;
import com.example.mainservice.dto.requests.CityRequestDTO;
import com.example.mainservice.entities.City;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class CityMapper {
    ModelMapper modelMapper = new ModelMapper();

    public City convertToEntity(CityRequestDTO cityRequestDTO) {
        return modelMapper.map(cityRequestDTO, City.class);
    }
//
//    public City covertUpdateObjToEntity(CityUpdateRequestDTO cityUpdateRequestDTO) {
//        return modelMapper.map(cityUpdateRequestDTO.getBody(), City.class);
//    }
}
