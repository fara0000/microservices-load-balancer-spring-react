package soa.lab.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class Human {
    @JsonIgnore
    private Integer id;
    private int age;
    private Double height;
    private ZonedDateTime birthday;
}
