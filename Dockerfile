# Use Eclipse Temurin (OpenJDK) as the base image
FROM eclipse-temurin:21-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the application's jar file to the container
# The jar file is generated in the target directory after building with Maven
COPY target/BookApplication-0.0.1-SNAPSHOT.jar app.jar

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
