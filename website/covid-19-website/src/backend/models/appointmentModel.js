// import connection
import db from "../config/db.js";

// Get appointments by data
export const getAppointments = (data, result) => {
    db.query("SELECT * FROM appointment WHERE ?", [data], (err, results) => {
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
    db.query("DELETE FROM appointment WHERE ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}