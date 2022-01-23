# COVID-19-TRACKING-APP

## Setup

### Server

- Install MySQL on your computer as a development machine.
- During installation, I think, you will be asked to make a user to connect as to the database server. Make that user: SOEN390 and password: SOEN390. This is what the application and website will assume the login credentials are when connecting to your database server.
- In MySQL Workbench, create a new schema called SOEN390 (Might be able to name it anything, don't know)
- Now to import the schema structure and data you can find here in the MySQL-Schema folder of the repo: In MySQL Workbench go to Server -> Data Import. 
- In Import Options choose "Import from Self-contained File", choose the SOEN390.sql file.
- In DefaultSchema to be Imported to, choose the schema you created above.
- Click "Start Import"
