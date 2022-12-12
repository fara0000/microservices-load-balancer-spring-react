package soa.lab.service;

import com.fasterxml.jackson.core.JsonProcessingException;

import javax.ejb.Remote;

@Remote
public interface CalculateService {
    Integer calculatePopulated() throws JsonProcessingException;

    Integer calculateNewest() throws JsonProcessingException;
}
