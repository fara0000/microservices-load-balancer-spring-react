FROM maven:3.8.4-jdk-11-slim AS build
RUN mkdir /app
WORKDIR /app
COPY target/eureka.jar /app
EXPOSE 8761
CMD ["java",  "-jar", "eureka.jar"]
