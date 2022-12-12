package com.example.mainservice.controllers;

import com.example.mainservice.dto.mappers.CityMapper;
import com.example.mainservice.dto.requests.CityRequestDTO;
import com.example.mainservice.dto.requests.CityUpdateRequestDTO;
import com.example.mainservice.dto.responses.CityResponseDTO;
import com.example.mainservice.dto.responses.MessageResponse;
import com.example.mainservice.endpoints.Endpoints;
import com.example.mainservice.entities.City;
import com.example.mainservice.enums.SortFields;
import com.example.mainservice.exceptions.WrongArgumentException;
import com.example.mainservice.services.CityService;
import io.swagger.v3.oas.annotations.*;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/")
@CrossOrigin
public class CityController {
    private final CityService cityService;
    private final CityMapper cityMapper;

    @GetMapping(Endpoints.CITY)
    @Valid
    @Operation(summary = "Get Cities",
            responses = {
                    @ApiResponse(description = " Getting Cities",
                            responseCode = "200",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = City.class))),
                    @ApiResponse(responseCode = "400`", content = @Content(mediaType = "application/json"), description = "City is invalid")
            }
    )
    public ResponseEntity<?> getCities(@RequestParam(required = false)  Integer size, @RequestParam(required = false) Integer page, @RequestParam(required = false) String sortable, @RequestParam(required = false) String filter) {
        if(page != null && size != null) {
            if(page < 1 || size < 1) {
//                throw new WrongArgumentException("page and size should be more than 0");
                return new ResponseEntity<>(new MessageResponse("page and size should be more than 0", 404), HttpStatus.NOT_FOUND);
            }
            if(!SortFields.isContains(sortable) && sortable != null && !sortable.equals("")) {
                return new ResponseEntity<>(new MessageResponse("Sortable item isn't correct", 404), HttpStatus.NOT_FOUND);
            }
        }

        if((page != null && size == null) || (size != null && page == null)) {
            if(page != null && page < 1) {
                return new ResponseEntity<>(new MessageResponse("page and size should be more than 0", 404), HttpStatus.NOT_FOUND);
            }
            if(size != null && size < 1) {
                return new ResponseEntity<>(new MessageResponse("page and size should be more than 0", 404), HttpStatus.NOT_FOUND);
            }
        }

        CityResponseDTO cityResponseDTO = cityService.getAllCities(size, page, sortable, filter);

        return new ResponseEntity<>(cityResponseDTO, HttpStatus.OK);
    }

    @GetMapping(Endpoints.CITY_BY_ID)
    public ResponseEntity<City> getCityById(@PathVariable Integer cityId) {
        return new ResponseEntity<>(cityService.getCityById(cityId), HttpStatus.OK);
    }

    @DeleteMapping(Endpoints.CITY)
    @Operation(summary = "Delete City",
            responses = {
                    @ApiResponse(description = "Delete City",
                            responseCode = "200",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = City.class))),
                    @ApiResponse(responseCode = "400", content = @Content(mediaType = "application/json"), description = "City is invalid")
            }
    )
    public ResponseEntity<String> deleteCity(@RequestParam Integer cityId) {
        return new ResponseEntity<>(cityService.deleteCityById(cityId), HttpStatus.OK);
    }

    @CrossOrigin
    @PostMapping(Endpoints.CITY)
    @Operation(summary = "Create City",
            responses = {
                    @ApiResponse(description = "Add City",
                            responseCode = "200",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = City.class))),
                    @ApiResponse(responseCode = "400", content = @Content(mediaType = "application/json"), description = "City is invalid")
            }
    )
    public ResponseEntity<City> addCity(@RequestBody @Valid CityRequestDTO cityRequestDTO) {
        System.out.print(cityRequestDTO);
        City city = cityMapper.convertToEntity(cityRequestDTO);
        System.out.print(city);

        return new ResponseEntity<>(cityService.addCity(city), HttpStatus.OK);
    }

    /*
         TODO: хреново сделано не хочется каждый раз при обновлении сущности все его параметры с клиента
                посылать хочется сделать так чтобы посылать только тот аттрибут который хотим изменить
    */
    @PutMapping(Endpoints.CITY)
    @Operation(summary = "Update City",
            responses = {
                    @ApiResponse(description = "Update City",
                            responseCode = "200",
                            content = @Content(mediaType = "application/json",
                                    schema = @Schema(implementation = City.class))),
                    @ApiResponse(responseCode = "400", content = @Content(mediaType = "application/json"), description = "City is invalid")
            }
    )
    public ResponseEntity<City> updateCity(@RequestBody CityUpdateRequestDTO cityUpdateRequestDTO) {
        City city = cityMapper.convertToEntity(cityUpdateRequestDTO.getBody());

        return new ResponseEntity<>(cityService.updateCity(cityUpdateRequestDTO.getId(), city), HttpStatus.OK);
    }

    @GetMapping(Endpoints.GET_CITY_AVERAGE)
    public ResponseEntity<Long> averageCitiesBySeaLevel() {
        return new ResponseEntity<>(cityService.averageBySeaLevel(), HttpStatus.OK);
    }

    @GetMapping(Endpoints.GET_CITIES_BY_NAME)
    public ResponseEntity<List<City>> getCitiesByName(@RequestParam String cityName) {
        return new ResponseEntity<>(cityService.getCitiesByName(cityName), HttpStatus.OK);
    }
}
