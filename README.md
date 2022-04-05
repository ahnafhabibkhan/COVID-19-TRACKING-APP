# COVID-19-TRACKING-APP
This project is meant to be a Covid19 Tracker tool and was created for Concordia's SOEN 390 (Software Process) Course.

Link to the website
---------------------------------
W## Team Members :technologist:

| #   | Name                 | ID        | Github Username     | Role                         |
| --- | :------------------- | :-------- | :------------------ |:-----------------------------|
| 1   | Mansoureh Edalati    | 40037283  |  MansiEdi2020       | UI Lead / Frontend           |
| 2   | Tommy Soucy          | 40085762  |  TommySoucy         | Backend / Database Management|
| 3   | Ahnaf Habib Khan     | 40079665  |  ahnafhabibkhan     | Tesitng & Micro-Management   |
| 4   | Weichen Wan          | 40072743  |  HWJFish            | Testing Lead                 |
| 5   | Abdul Qadir Ali      | 40075793  |  AQA98              | Backend                      |
| 6   | Yousha Hyatoolla     | 40099559  |  Yousha-hyat1999    | Fullstack                    |
| 7   | Mohamed Abdul        | 40098785  |  M-Dimbio           | Fullstack                    |
| 8   | Nafis Md. Ali        | 40095387  |                     | Documentation                |
| 9   | Mirali Chavoshi      | 40064632  |                     | Documentation                |

F = Frontend B = Backend

-----------------------------------
Objectives::trophy:


Core features: 

----------------------------------

Technology Stack
Frontend:
Vue.JS + Vuetify<br/>
Backend:
Node JS<br/>
Database:
Mysql<br/>
Continuous Integration:
Jenkins<br/>
Unit Testing:
Mocha, chai, chai-HTTP, c8

-------------------------------------------------------------
Organizational Block Diagram
## Setup

### Server

- Install MySQL on your computer as a development machine.
- During installation, you will be asked to make a user to connect as to the database server. Make that user: SOEN390 and password: SOEN390. This is what the application and website will assume the login credentials are when connecting to your database server.
- In MySQL Workbench, create a new schema called SOEN390 (Might be able to name it anything, don't know)
- Now to import the schema structure and data you can find here in the MySQL-Schema folder of the repo: In MySQL Workbench go to Server -> Data Import. 
- In Import Options choose "Import from Self-contained File", choose the SOEN390.sql file.
- In DefaultSchema to be Imported to, choose the schema you created above.
- Click "Start Import"

## Running

Ensure MySQL Server is setup as described above, then run following commands:

- cd COVID-19-TRACKING-APP/website/covid-19-website
- npm install
- npm run serve
- cd COVID-19-TRACKING-APP/website/covid-19-website/src/backend
- node index
 
This will install dependencies, run the frontend, then the backend server.


## How to run Docker:
-first download docker on your computer.
- There are three docker files for front end, backend and server.
- Once its downloaded, Through the terminal go in the directories of each docker fie and and first build the docker image.
- Once its build, run the image.
 
     ## For server side:
     - **\soen390Project\COVID-19-TRACKING-APP\MySQL-Schema>** --> here is the docker file. once you are there run this command to built the docker image
     - docker build -t soen-db .  
     - once the image has been built run this command:
     - docker run -d --name soen-sql -p 3306:3306 soen-dbdocker run -p 3306:3306 -d  mysql
     
     ## for frontend
     - **\COVID-19-TRACKING-APP\website\covid-19-website>** --> here is the docker file. once you are there run this command to built the docker image
     - docker build -t vuejs-cookbook/dockerize-vuejs-app .
     - once the image has been built run this command:
     - docker run -it -p 8080:8080 --rm --name dockerize-vuejs-app-1 vuejs-cookbook/dockerize-vuejs-app
     
     ## for backend
     - **\COVID-19-TRACKING-APP\website>** --> here is the docker file. once you are there run this command to built the docker image
     - docker build . -t backend/node-web-app
     - Once the image has been built run this command:
     - docker run -p 5000:5000 -d backend/node-web-app
     
    ## Note: make sure the ports specified in the run command are free.
     
