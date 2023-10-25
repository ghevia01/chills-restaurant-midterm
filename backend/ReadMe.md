# Chilli's Restaurant Backend

---

## Chilli's Restaurant Backend Project

This is a simple backend in Spring Boot that uses a MySQL database for persistence.

## Pre-requisites

### Technologies to be Installed:

1. **Java 17**: You can download it from the official [Oracle website](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) or use package managers like `apt` for Linux.
2. **Maven**: Install Maven for building the project. You can follow the instructions from the [Maven official website](https://maven.apache.org/download.cgi).
3. **Docker & Docker Compose**: These are required to set up the MySQL instance. You can download them from [Docker's official website](https://docs.docker.com/get-docker/).
4. **VSCode**: Install Visual Studio Code from the [VSCode official website](https://code.visualstudio.com/). For Spring Boot development, you should install the "Spring Boot Tools" and "Java Extension Pack" extensions from the VSCode marketplace.
5. **Postman**: This tool is required for testing the API endpoints. Download it from the [Postman website](https://www.postman.com/downloads/).

### Setting up:

1. **Java & Maven**: Ensure that both Java and Maven are set in the system's PATH.
   
   ```bash
   java -version
   mvn -version
   ```

2. **Docker**: Ensure Docker is running:

   ```bash
   docker info
   ```

3. **VSCode**: Once you have the necessary extensions installed, you can open your project in VSCode. The extensions will automatically detect your project type and provide relevant suggestions and IntelliSense.
4. **Database Configuration**: By default, the MySQL instance will be set up with a root password as 'root' and a database named 'chillisdb'. Ensure to update the `application.properties` file in the Spring Boot application to match these credentials.

## Automated Pipeline: `pipeline.sh`

The `pipeline.sh` is a simple shell script that automates the process of pulling the latest code from the repository, building the Maven project, dockerizing the application, and deploying it using Docker Compose.

### How to Execute the Pipeline:

1. Ensure the `pipeline.sh` script has execute permissions:

   ```bash
   chmod +x pipeline.sh
   ```

2. Run the script:

   ```bash
   ./pipeline.sh
   ```

   Follow the on-screen logs to check the progress.

## Conclusion

You've now set up and run the Spring Boot demo application with a MySQL backend using VSCode. If you encounter any issues, ensure that the configurations match across the `docker-compose.yml` file and the `application.properties` file within the Spring Boot application.

---
