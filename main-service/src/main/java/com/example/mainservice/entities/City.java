package com.example.mainservice.entities;

import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
@Data
@NoArgsConstructor
@Table(name = "city")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NotBlank
    @NotNull
    @Column(name = "name")
    private String name; //Поле не может быть null, Строка не может быть пустой

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @NotNull
    @JoinColumn(name = "coordinates_id", referencedColumnName = "id")
    private Coordinates coordinates; //Поле не может быть null

    @NotNull
    @Column(name = "creationDate")
    private ZonedDateTime creationDate = ZonedDateTime.now(); //Поле не может быть null, Значение этого поля должно генерироваться автоматически

    @Min(1)
    @Column(name = "area")
    private long area; //Значение поля должно быть больше 0

    @NotNull(message = "population can't be empty")
    @Min(1)
    @Column(name = "population")
    private Integer population; //Значение поля должно быть больше 0, Поле не может быть null

    @Column(name = "metersAboveSeaLevel")
    private Long metersAboveSeaLevel;

    @Column(name = "climate")
    private Climate climate; //Поле может быть null

    @NotNull
    @Column(name = "government")
    private Government government; //Поле не может быть null

    @NotNull
    @Column(name = "standardOfLiving")
    private StandardOfLiving standardOfLiving; //Поле не может быть null

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Nullable
    @JoinColumn(name = "human_id", referencedColumnName = "id")
    private Human governor; //Поле может быть null
}
