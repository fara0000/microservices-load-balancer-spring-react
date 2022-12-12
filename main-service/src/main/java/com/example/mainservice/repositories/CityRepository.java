package com.example.mainservice.repositories;

import com.example.mainservice.entities.City;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface CityRepository extends JpaRepository<City, Integer>, PagingAndSortingRepository<City, Integer>, JpaSpecificationExecutor<City> {
    City findCityById(Integer id);

    @Query(value="select avg(City.meters_above_sea_level) from City", nativeQuery = true)
    Long findAverageOfSeaLevels();

    Optional<List<City>> findCitiesByName(String name);
}
