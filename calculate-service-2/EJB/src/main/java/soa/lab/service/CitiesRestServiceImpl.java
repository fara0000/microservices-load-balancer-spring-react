package soa.lab.service;

import org.jboss.ejb3.annotation.Pool;
import soa.lab.entities.City;

import javax.ejb.Stateless;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Stateless
@Pool("slsb-strict-max-pool")
public class CitiesRestServiceImpl implements CitiesRestService {
    private final String URL = "https://localhost:8100/city";
    private Client client;

    @Override
    public List<City> getCitiesFromMainService() {
        client = ClientBuilder.newClient();
        List<City> cities = client.target(URL)
                .request(MediaType.APPLICATION_JSON)
                .get(new GenericType<>() {
                });
        client.close();
        return cities;
    }
}
