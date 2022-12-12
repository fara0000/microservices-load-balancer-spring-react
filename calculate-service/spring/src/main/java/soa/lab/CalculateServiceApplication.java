package soa.lab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
public class CalculateServiceApplication extends SpringBootServletInitializer {
    public static void main(String[] args) {
        SpringApplication.run(CalculateServiceApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(CalculateServiceApplication.class);
    }
}


//@SpringBootApplication
//public class CalculateServiceApplication {
//
//    public static void main(String[] args) {
//        SpringApplication.run(CalculateServiceApplication.class, args);
//    }

//    @Override
//    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
//        return builder.sources(CalculateServiceApplication.class);
//    }
//    extends SpringBootServletInitializer
//}
