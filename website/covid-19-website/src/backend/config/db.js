import mysql from "mysql2";

// create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'SOEN390',
    password: 'SOEN390',
    database: 'SOEN390'
});

export default db;