package com.example.mainservice.endpoints;

public interface Endpoints {
    String CITY = "/city";
    String CITY_BY_ID = "/city/{cityId}";
    String GET_CITY_AVERAGE = "/city/metersAboveSeaLevel/average";
    String GET_CITY_QUANTITY = "/city/creationDateGroup/quantity";
    String GET_CITIES_BY_NAME = "/city/name";
}