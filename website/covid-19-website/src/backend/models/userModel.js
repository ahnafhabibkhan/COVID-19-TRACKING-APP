// import connection
import db from "../config/db.js";

// Get Single User by Email
export const getUserByEmail = (email, result) => {
    db.query("SELECT * FROM user WHERE Email = ?", [email], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

// Get Users by data
export const getUsersByData = (data, result) => {
    db.query("SELECT * FROM user WHERE ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Insert User to Database
export const insertUser = (data, result) => {
    db.query("INSERT INTO user SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete User from Database
export const deleteUserById = (id, result) => {
    db.query("DELETE FROM user WHERE UserID = ?", [id], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Update User
export const modifyUser = (data, id, result) => {
    db.query("UPDATE user SET ? WHERE UserID = ?", [data, id], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}