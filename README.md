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
| 4   |                      |           |                     | Frontend Lead                |
| 5   | Abdul Qadir Ali      | 40075793  |                     | Backend                      |
| 6   | Yousha Hyatoolla     | 40099559  |  Yousha-hyat1999    | Fullstack                    |
| 7   |                      |           |                     | Scrum Master                 |
| 8   | Mohamed Abdul        | 40098785  |  M-Dimbio           | Fullstack                    |
| 9   | Nafis Md. Ali        |           |                     | Documentation                |

F = Frontend B = Backend

-----------------------------------
Objectives::trophy:


Core features: 

----------------------------------
Acceptance Tests
See the features directory of the project.

Technology Stack
Frontend:
Vue.JS + Vuetify
Backend:
Java
Database:
Mysql
Continuous Integration
GitHub Actions

Unit Testing:
junit

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

## Running

Ensure MySQL Server is setup as described above, then run following commands:

- cd COVID-19-TRACKING-APP/website/covid-19-website
- npm install
- npm run serve
- cd COVID-19-TRACKING-APP/website/covid-19-website/src/backend
- node index
 
This will install dependencies, run the frontend, then the backend server.

-------------------------------------------------------------

# Sprint 1 
                                                 |links
|---|---
|1. User Stories Backlog (USB)                   |[USB]()
|2. Release Plan (Sprint #2 planning)            |[Release Plan]()
|3. Software Architecture Document (SAD)         |[SAD]() <br> [Viewpoints]()
|4. Risk Assessment & Risk Management Plan (RMP) |[RMP]()
|5. UI prototypes for Sprint #2 user stories     |[UIP]()
|6. Testing Plan                                 |
|7. Running prototype                            |
|8. Short sprint retrospective                   |
