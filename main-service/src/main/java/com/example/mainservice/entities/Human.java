package com.example.mainservice.entities;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "human")
public class Human {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Min(1)
    @Column(name = "age")
    private int age; //Значение поля должно быть больше 0

    @Min(1)
    @Column(name = "height")
    private Double height; //Значение поля должно быть больше 0

    private ZonedDateTime birthday;
}
