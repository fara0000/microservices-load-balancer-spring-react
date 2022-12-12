package soa.lab.entities;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class City {
    private long id;
    private String name;
    private Coordinates coordinates;
    private ZonedDateTime creationDate;
    private long area;
    private Integer population;
    private Long metersAboveSeaLevel;
    private Climate climate;
    private Government government;
    private StandardOfLiving standardOfLiving;
    private Human governor;
}
