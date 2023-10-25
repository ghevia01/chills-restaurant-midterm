# Chilli's Restaurant Web Application (BackEnd)

This is a Spring Boot Java Application BackEnd for Chilli's Restaurant.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the Application](#running-the-application)

## Prerequisites

Before you begin, ensure you have the following software installed:

1. **Java 11**:
   - **Installation**:
     - **Windows/Mac**: Download and install from the [official Oracle website](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
     - **Linux**: Use the package manager specific to your distribution, for instance:
       ```
       sudo apt install openjdk-11-jdk
       ```
   - **Verification**: Check your Java version by running:
     ```
     java -version
     ```

2. **Maven**:
   - **Installation**:
     - Download and follow the installation instructions from the [official Maven website](https://maven.apache.org/download.cgi).
   - **Verification**: Verify its installation with:
     ```
     mvn -version
     ```

3. **Docker**:
   - **Installation**:
     - Download and install Docker for your OS from the [official website](https://www.docker.com/get-started).
   - **Verification**: Check Docker version by running:
     ```
     docker --version
     ```

4. **Docker Compose**:
   - **Note**: Docker Compose is typically included with Docker installations on Windows and Mac. For Linux, you might need to install it separately.
   - **Verification**: Check Docker Compose version with:
     ```
     docker-compose --version
     ```

## Setup

1. **Clone the Repository**:
   ```
   git clone [repository_url]
   cd [repository_directory]
   ```

2. **Package the Application**:
   Package your Spring Boot application using Maven. This will produce a `.war` file in the `target` directory.
   ```
   mvn clean package
   ```

3. **Build Docker Images**:
   Navigate to the directory containing the `docker-compose.yml` file (should be the root directory of the project) and build the Docker images:
   ```
   docker-compose build
   ```

## Running the Application

1. **Start the Application**:
   From the directory containing the `docker-compose.yml` file, start the application with the following command:
   ```
   docker-compose up
   ```

2. **Access the Application**:
   Once the containers are up and running, navigate to:
   ```
   http://localhost:8080/
   ```

3. **Stopping the Application**:
   Gracefully stop the application and the MySQL database with:
   ```
   docker-compose down
   ```

---

With these instructions, users will have a clear step-by-step guide to setting up the required software and running the application. Save this content as `README.md` in the root directory of your project.