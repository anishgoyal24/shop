FROM adoptopenjdk/openjdk11:alpine-jre
EXPOSE 8082
ARG JAR_FILE=/shop-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} main-app.jar
ENTRYPOINT ["java","-jar","main-app.jar"]