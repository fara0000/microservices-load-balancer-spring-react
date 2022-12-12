package com.example.mainservice.entities;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import javax.validation.constraints.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "coordinates")
@DynamicUpdate
public class Coordinates {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotNull
    @Column(name = "x")
    private Float x;

    @Max(740)
    @Column(name = "y")
    private Integer y;

    public Coordinates(Integer coordinateId, Float x, Integer y) {
        this.id = coordinateId;
        this.x = x;
        this.y = y;
    }
}
