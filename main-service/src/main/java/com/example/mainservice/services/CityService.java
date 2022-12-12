package com.example.mainservice.services;

import com.example.mainservice.dto.responses.CityResponseDTO;
import com.example.mainservice.entities.Coordinates;
import com.example.mainservice.enums.SortFields;
import com.example.mainservice.exceptions.NotFoundException;
import com.example.mainservice.entities.City;
import com.example.mainservice.repositories.CityRepository;
import com.example.mainservice.rsql.CustomRsqlVisitor;
import cz.jirutka.rsql.parser.RSQLParser;
import cz.jirutka.rsql.parser.ast.Node;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@AllArgsConstructor
public class CityService {
    private final CityRepository cityRepository;


    public CityResponseDTO getAllCities(Integer size, Integer page, String sortable, String filter) {
        Integer count = cityRepository.findAll().size();
        Pageable pagination = PageRequest.of(page != null ? page - 1 : 0, size != null ? size : count - 1);
        Pageable paginationAndSorting = PageRequest.of(page != null ? page - 1 : 0, size != null ? size : count - 1, Sort.by(SortFields.isContains(sortable) ? sortable : "id"));

        if (filter == null || filter.isEmpty()) {
            if (page == null || size == null) {
                if (sortable == null || sortable.isEmpty())
                     new CityResponseDTO(cityRepository.findAll(), cityRepository.findAll().size());
                return new CityResponseDTO(cityRepository.findAll(Sort.by(SortFields.isContains(sortable) ? sortable : "id")), count);
            }
            if (sortable == null || sortable.isEmpty())
                return new CityResponseDTO(cityRepository.findAll(pagination).stream().collect(Collectors.toList()), count);
                return new CityResponseDTO(cityRepository.findAll(paginationAndSorting).stream().collect(Collectors.toList()), count);
        }

        Node rootNode = new RSQLParser().parse(filter);
        Specification<City> spec = rootNode.accept(new CustomRsqlVisitor<>());
        Integer specCount = cityRepository.findAll(spec, Sort.by(SortFields.isContains(sortable) ? sortable : "id")).size();
        if (page == null || size == null) {
            if (sortable == null || sortable.isEmpty()) return new CityResponseDTO(cityRepository.findAll(spec), count);
            return new CityResponseDTO(cityRepository.findAll(spec, Sort.by(SortFields.isContains(sortable) ? sortable : "id")), specCount);
        }
        if (sortable == null || sortable.isEmpty())
            return new CityResponseDTO(cityRepository.findAll(spec, pagination).stream().collect(Collectors.toList()), specCount);

        return new CityResponseDTO(cityRepository.findAll(spec, paginationAndSorting).stream().collect(Collectors.toList()), specCount);
    }

    public City getCityById(Integer id) {
        return cityRepository.findById(id).orElseThrow(() -> new NotFoundException(String.format("City with id %d not found", id)));
    }

    public String deleteCityById(Integer id) {
        String successMsg =  "City_id " + id + " deleted successfully";
        getCityById(id);
        cityRepository.deleteById(id);

        return successMsg;
    }

    public City addCity(City city) {
        return cityRepository.save(city);
    }

    public City updateCity(Integer id, City cityUpdateData) {
        Integer coordinateId = cityRepository.findById(id).get().getCoordinates().getId();
        Coordinates coordinates = new Coordinates(coordinateId, cityUpdateData.getCoordinates().getX(), cityUpdateData.getCoordinates().getY());
        System.out.println(coordinateId);
        System.out.println(coordinates);
        return cityRepository.findById(id).map(org -> {
            org.setName(cityUpdateData.getName());
            org.setArea(cityUpdateData.getArea());
            org.setClimate(cityUpdateData.getClimate());
            org.setGovernment(cityUpdateData.getGovernment());
            org.setGovernor(cityUpdateData.getGovernor());
            org.setCoordinates(coordinates);
            org.setCreationDate(cityUpdateData.getCreationDate());
            org.setMetersAboveSeaLevel(cityUpdateData.getMetersAboveSeaLevel());
            org.setPopulation(cityUpdateData.getPopulation());
            org.setStandardOfLiving(cityUpdateData.getStandardOfLiving());
            return cityRepository.save(org);
        }).orElseThrow(() -> new NotFoundException(String.format("City with id %d not found", id)));
    }

    public Long averageBySeaLevel() {
        return cityRepository.findAverageOfSeaLevels();
    }

    public List<City> getCitiesByName(String cityName) {
        return cityRepository.findCitiesByName(cityName).orElseThrow(() -> new NotFoundException(String.format("City with name %d not found", cityName)));
    }
}
