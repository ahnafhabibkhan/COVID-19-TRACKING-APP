# COVID-19-TRACKING-APP
This project is meant to be a Covid19 Tracker tool and was created for Concordia's SOEN 390 (Software Process) Course.

Link to the website
---------------------------------
Written by:
1-Manasoureh Edalati - mansiedi1980 - (40037283)
2-
3-
4-
5-
6-
7-
8-
-----------------------------------
Objectives:

Core features: 
----------------------------------
Acceptance Tests
See the features directory of the project.

Technology Stack
Frontend:
Vue.JS
Backend:
Java
Database:
Mysql
Continuous Integration
GitHub Actions

Unit Testing:
jUnit
-------------------------------------------------------------
Organizational Block Diagram
## Setup

### Server

- Install MySQL on your computer as a development machine.
- During installation, I think, you will be asked to make a user to connect as to the database server. Make that user: SOEN390 and password: SOEN390. This is what the application and website will assume the login credentials are when connecting to your database server.
- In MySQL Workbench, create a new schema called SOEN390 (Might be able to name it anything, don't know)
- Now to import the schema structure and data you can find here in the MySQL-Schema folder of the repo: In MySQL Workbench go to Server -> Data Import. 
- In Import Options choose "Import from Self-contained File", choose the SOEN390.sql file.
- In DefaultSchema to be Imported to, choose the schema you created above.
- Click "Start Import"
