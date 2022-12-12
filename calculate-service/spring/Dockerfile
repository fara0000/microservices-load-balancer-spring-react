# multistage building
# Build stage
FROM maven:3.8.4-jdk-11-slim AS build
COPY src /app/src
COPY pom.xml /app
RUN mvn -f /app/pom.xml clean package
#
FROM openjdk:11-jre-slim
COPY --from=build /app/target/CalculateService-Spring.jar /app/CalculateService-Spring.jar
CMD ["java","-jar","/app/CalculateService-Spring.jar"]