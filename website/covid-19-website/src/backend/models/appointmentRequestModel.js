// import connection
import db from "../config/db.js";

// Get appointment requests by data
export const getAppointmentRequests = (data, result) => {
    db.query("SELECT * FROM appointmentrequest WHERE ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Insert appointment request to Database
export const insertAppointmentRequest = (data, result) => {
    db.query("INSERT INTO appointmentrequest SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete appointment request from Database
export const deleteAppointmentRequest = (data, result) => {
    db.query("DELETE FROM appointmentrequest WHERE ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}