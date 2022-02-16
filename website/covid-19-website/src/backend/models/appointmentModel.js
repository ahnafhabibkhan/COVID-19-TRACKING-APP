// import connection
import db from "../config/db.js";
import {formatWhere} from "../config/db.js";

// Get appointments by data
export const getAppointments = (data, result) => {
    const where = formatWhere(data);
    const query = "SELECT * FROM appointment WHERE "+where;
    db.query(query, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Insert appointment to Database
export const insertAppointment = (data, result) => {
    db.query("INSERT INTO appointment SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete appointment from Database
export const deleteAppointment = (data, result) => {
    const where = formatWhere(data);
    const query = "DELETE FROM appointment WHERE "+where;
    db.query(query, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}