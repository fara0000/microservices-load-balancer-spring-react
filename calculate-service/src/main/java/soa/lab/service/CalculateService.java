package soa.lab.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import soa.lab.entity.City;
import soa.lab.exception.DataNotFoundException;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class CalculateService {
    private final WebClient localApiClient;

    @Autowired
    public CalculateService(WebClient localApiClient) {
        this.localApiClient = localApiClient;
    }

    private City[] getCitiesFromMainService() {
        City[] responseBody = localApiClient.get()
                .uri("/city")
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(City[].class)
                .block();
        if (responseBody == null)
            throw new DataNotFoundException("Cities not found");
        return responseBody;
    }


    public Integer calculatePopulated() {
        City[] responseBody = getCitiesFromMainService();
        log.info("Request from main service received with {} elements.\n CalculatePopulated", responseBody.length);
        return 90;
    }

    public Integer calculateNewest() {
        City[] responseBody = getCitiesFromMainService();
        log.info("Request from main service received with {} elements.\n calculateNewest.", responseBody.length);
        return 100;
    }
}
