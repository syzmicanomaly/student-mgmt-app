NextGear Capital Software Engineering Assessment
================================================

Overview The purpose of this assessment is to have you build a simple “CRUD” application that you will be asked to bring 
with you to the interview. At the interview, in addition to other behavioral and cultural fit questions, you will be asked 
to walk a small group of engineers through the work you did in this assessment. This will allow us to assess your technical 
skills using a realistic scenario in a low-pressure environment. We are interested in seeing you demonstrate technical 
skills commensurate with your experience level and in understanding how you work through technical tasks. Please bring 
your source code and any other supporting materials on a thumb drive so that they can be displayed on a screen for the 
group to review. 

Requirements 
============

The CRUD application will be a simple Student Management System that has the following features: 

1. The end user of the Student Management System should be able to: 
    
    a. Launch the application and be presented with a list of students (no paging is necessary). 
    
    b. Insert a new student. 
    
    c. Update an existing student selected from the list. 
    
    d. Delete a student from the list after providing a confirmation dialog. 
    
Architecture 
============

The architecture of this assessment should conceptually match the way that we build software at NextGear Capital. Our 
application stores its data in a relational database. The business logic exists in an application server that 
communicates with the database. The user interface is completely decoupled from the middle tier, accessing it only 
through the REST API and not accessing the database directly. Specifically, we use Java 1.8 to build our middle tier 
business logic, and HTML5/AngularJS to build our user interface as a Single Page Application. The middle tier 
communicates with a Microsoft SQL Server database, and is accessed by the user interface through a REST API. In 
the near future, our database technology will be changing to PostgreSQL. For the purposes of this assessment, you 
may use the technology of your choice. We expect the technology used would be in line with that in which you are 
most proficient. However, you must demonstrate complete separation between the UI and the middle tier as described 
above.