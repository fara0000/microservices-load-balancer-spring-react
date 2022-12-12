package com.example.mainservice.config;

import com.example.mainservice.entities.City;
import com.fasterxml.classmate.TypeResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
/**
 swagger url: http://localhost:8080/spring-security-rest/api/v2/api-docs
**/

@Configuration
public class SwaggerConfig {
    @Bean(name = "swagger")
    public Docket api(TypeResolver typeResolver) {
        return new Docket(DocumentationType.SWAGGER_2)
                .additionalModels(
                        typeResolver.resolve(City.class))
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.example.mainservice.controllers"))
                .paths(PathSelectors.any())
                .build();
    }
}
