FROM maven:3.8.4-jdk-11-slim AS build
RUN mkdir /app
WORKDIR /app
COPY target/CalculateService-1.0-SNAPSHOT.jar /app
EXPOSE 9998
CMD ["java",  "-jar", "CalculateService-1.0-SNAPSHOT.jar"]
