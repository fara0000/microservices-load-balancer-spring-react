FROM maven:3.8.4-jdk-11-slim AS build
RUN mkdir /app
WORKDIR /app
COPY target/zuul.jar /app
EXPOSE 8100
CMD ["java",  "-jar", "zuul.jar"]
