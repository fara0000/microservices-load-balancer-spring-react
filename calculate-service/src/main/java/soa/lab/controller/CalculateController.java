package soa.lab.controller;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import soa.lab.service.CalculateService;

@Slf4j
@RestController
@CrossOrigin
@AllArgsConstructor
@RequestMapping("/calculate")
public class CalculateController {
    private final CalculateService calculateService;

    @CrossOrigin(origins = "https://se.ifmo.ru/~s270239")
    @GetMapping("/between-max-and-min-populated")
    public ResponseEntity<Integer> calculatePopulated() {
        System.out.println("calculatePopulated method in controller");
        return new ResponseEntity<>(calculateService.calculatePopulated(), HttpStatus.OK);
    }

    @CrossOrigin(origins = "https://se.ifmo.ru/~s270239")
    @GetMapping("/to-newest")
    public ResponseEntity<Integer> calculateToNewest() {
        System.out.println("calculateToNewest method in controller");
        return new ResponseEntity<>(calculateService.calculateNewest(), HttpStatus.OK);
    }
}
