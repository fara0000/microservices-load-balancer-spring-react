package soa.lab.service;

import soa.lab.entities.City;

import java.util.List;

public interface CitiesRestService {
    List<City> getCitiesFromMainService();
}
