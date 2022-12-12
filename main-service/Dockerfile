# multistage building
# Build stage
FROM maven:3.8.4-jdk-11-slim AS build
COPY src /app/src
COPY pom.xml /app
RUN mvn -f /app/pom.xml clean package
#
FROM openjdk:11-jre-slim
COPY --from=build /app/target/MainService.jar /app/MainService.jar
CMD ["java","-jar","/app/MainService.jar"]