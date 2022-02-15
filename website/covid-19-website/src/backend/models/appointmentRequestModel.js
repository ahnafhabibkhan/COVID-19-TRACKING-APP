// import connection
import db from "../config/db.js";
import {formatWhere} from "../config/db";

// Get appointment requests by data
export const getAppointmentRequests = (data, result) => {
    const where = formatWhere(data);
    const query = "SELECT * FROM appointmentrequest WHERE "+where;
    db.query(query, (err, results) => {
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
    const where = formatWhere(data);
    const query = "DELETE FROM appointmentrequest WHERE "+where;
    db.query(query, [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}