// import connection
import db from "../config/db.js";

// Get Request by Email
export const getPasswordResetRequestByID = (id, result) => {
    db.query("SELECT * FROM passwordresetrequest WHERE UserID = ?", [id], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert Request to Database
export const insertPasswordResetRequest = (data, result) => {
    db.query("INSERT INTO passwordresetrequest SET UserID = ? , `Key` = ?", [data.UserID, data.Key], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete Request from Database
export const deletePasswordResetRequestById = (id, result) => {
    db.query("DELETE FROM passwordresetrequest WHERE UserID = ?", [id], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update a Request
export const updatePasswordResetRequestById = (data, id, result) => {
    db.query("UPDATE passwordresetrequest SET `Key` = ? WHERE UserID = ?", [data.Key, id], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}