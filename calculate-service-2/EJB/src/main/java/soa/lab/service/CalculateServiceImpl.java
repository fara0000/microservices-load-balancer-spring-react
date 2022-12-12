package soa.lab.service;

import lombok.extern.slf4j.Slf4j;
import org.jboss.ejb3.annotation.Pool;
import soa.lab.entities.City;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import java.util.List;

@Slf4j
@Stateless
@Pool("slsb-strict-max-pool")
public class CalculateServiceImpl implements CalculateService {
    @EJB
    private CitiesRestService citiesRestService;

    @Override
    public Integer calculatePopulated()  {
        List<City> response = citiesRestService.getCitiesFromMainService();
        log.info("Request from main service received with {} elements.\n CalculatePopulated", response.size());
        return 90;
    }

    @Override
    public Integer calculateNewest() {
        List<City> response = citiesRestService.getCitiesFromMainService();
        log.info("Request from main service received with {} elements.\n calculateNewest.", response.size());
        return 100;
    }
}
