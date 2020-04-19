FROM adoptopenjdk/openjdk11:alpine-jre
VOLUME /tmp
EXPOSE 8082
ARG JAR_FILE=target/main-app.jar
COPY ${JAR_FILE} main-app.jar
ENTRYPOINT ["java","-jar","main-app.jar"]