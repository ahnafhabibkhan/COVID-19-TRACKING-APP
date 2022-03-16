import mysql from "mysql2";

// create the connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'SOEN390',
    password: 'SOEN390',
    database: 'SOEN390'
});

export default db;

// Formats a string of data into a where clause that can be send to the database
export function formatWhere(data){
    let where = "";
    var count=0;
    for(var prop in data) {
        // eslint-disable-next-line no-prototype-builtins
        if (data.hasOwnProperty(prop)) {
            ++count;
        }
    }

    const keys = Object.keys(data);
    for(let i = 0; i < count; ++i){
        const element = data[keys[i]];
        where = where + "`" + keys[i] + "` = ";
        if(typeof element == "string"){
            where = where + "'" + element + "'";
        }else{
            where = where + element;
        }
        if(i != count - 1){
            where = where + " and "
        }
    }
    return where;
}