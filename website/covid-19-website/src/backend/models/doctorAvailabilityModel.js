// import connection
import db from "../config/db.js";
import {formatWhere} from "../config/db.js";

// Get availabilities by data
export const getAvailabilities = (id, result) => {
    db.query("SELECT * FROM doctoravailability WHERE DID = ?", [id], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Insert availability to Database
export const insertAvailability = (data, result) => {
    db.query("INSERT INTO doctoravailability SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete availability from Database
export const deleteAvailability = (data, result) => {
    const where = formatWhere(data);
    const query = "DELETE FROM doctoravailability WHERE "+where;
    db.query(query, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}