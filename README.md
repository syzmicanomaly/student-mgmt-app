Syzmicanomaly Student Management App
================================================

This application serves as a demonstration of my basic development capabilities. It is an app that allows creation and 
rudimentary management of students.
    
Design
======

The application is written as a Spring Boot application that launches its own web environment (though it can be built
to produce a WAR and be deployed in any servlet container). It utilizes JPA for the persistence layer, and relies
on switchable Spring profiles for choice of underlying database: either MS SQL, PostgreSQL or an embedded H2 instance
for demo purposes. The interaction with the persistence layer is handled via the StudentManagementService, which handles
validation and proper error handling/wrapping/logging. There is a single REST API controller that exposes 
StudentManagementService service. An optional Spring config can be enabled via active profile that exposes API
via Swagger (allowing direct access to API operations via Swagger web UI). The web UI is written as a Single Page 
Application using React.js. All API operations are exposed in the web UI. Unit tests exist for StudentManagementService.

Building and Running
====================

The application is built using Gradle; the JS build is controlled via Gulp/Webpack stack. 

Logs for application are written to:

    logs/syzmicanomaly-student-mgmt.log

Following are the commands needed to perform build and run tasks:
    
#### To build project (and execute unit tests):
    
    ./gradlew clean build

#### To launch application in Spring Boot with embedded DB, Swagger and demo data:
    
    ./gradlew bootRun -Dspring.profiles.active=swagger,demo

#### To launch application in Spring Boot with MS SQL DB, Swagger:
    
    ./gradlew bootRun -Dspring.profiles.active=swagger,mssql -Ddb.port=<db port> -Ddb.password=<db password>

#### To launch application in Spring Boot with PostgreSQL DB, Swagger:
    
    ./gradlew bootRun -Dspring.profiles.active=swagger,postgresql -Ddb.port=<db port> -Ddb.password=<db password>

