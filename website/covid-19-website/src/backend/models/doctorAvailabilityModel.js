// import connection
import db from "../config/db.js";

// Get availabilities by data
export const getAvailabilities = (data, result) => {
    db.query("SELECT * FROM doctoravailability WHERE ?", [data], (err, results) => {
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
export const deleteAvailiability = (data, result) => {
    db.query("DELETE FROM doctoravailability WHERE ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}