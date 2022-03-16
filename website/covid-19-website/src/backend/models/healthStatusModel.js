// import connection
import db from "../config/db.js";

// Get Single latest health status by ID
export const getLatestHealthStatusByID = (pid, result) => {
    db.query("select * from healthstatus where PID = ? order by fillOutDate desc", [pid], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Get health statuses by ID
export const getHealthStatusesByID = (pid, result) => {
    db.query("select * from healthstatus where PID = ? order by fillOutDate desc", [pid], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Insert health status into Database
export const insertHealthStatus = (data, result) => {
    db.query("INSERT INTO healthstatus SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete healthstatus from Database
export const deleteHealthStatusByPK = (args, result) => {
    db.query("DELETE FROM healthstatus WHERE PID = ? and fillOutDate = ?", [args.pid, args.fillOutDate], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete healthstatuses from Database
export const deleteHealthStatusByID = (pid, result) => {
    db.query("DELETE FROM healthstatus WHERE PID = ?", [pid], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update a health status
export const updateHealthStatusByPK = (data, pid, fillOutDate, result) => {
    db.query("UPDATE healthstatus SET ? WHERE PID = ? and fillOutDate = ?", [data, pid, fillOutDate], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}