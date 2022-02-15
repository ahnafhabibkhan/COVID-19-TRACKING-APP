// import connection
import db from "../config/db.js";

// Get Single account request by Email
export const getAccountRequestByEmail = (email, result) => {
    db.query("SELECT * FROM accountrequest WHERE Email = ?", [email], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Get all account requests
export const getAccountRequests = (result) => {
    db.query("SELECT * FROM accountrequest", (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Insert account request into Database
export const insertAccountRequest = (data, result) => {
    db.query("INSERT INTO accountrequest SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete account request from Database
export const deleteAccountRequestById = (email, result) => {
    db.query("DELETE FROM accountrequest WHERE Email = ?", [email], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}