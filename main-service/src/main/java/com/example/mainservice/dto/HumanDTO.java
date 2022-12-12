package com.example.mainservice.dto;
import lombok.Data;
import java.time.ZonedDateTime;

@Data
public class HumanDTO {
    private int age;
    private Double height;
    private ZonedDateTime birthday;
}
