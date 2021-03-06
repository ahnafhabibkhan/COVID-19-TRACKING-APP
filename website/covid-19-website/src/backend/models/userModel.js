// import connection
import db from "../config/db.js";
import {formatWhere} from "../config/db.js";

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

// Get all Users
export const getUsers = (result) => {
    db.query("SELECT * FROM user", (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get Users by data
export const getUsersByData = (data, result) => {
    const where = formatWhere(data);
    const query = "SELECT * FROM user WHERE "+where;
    db.query(query, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get basic data for Users that were covid positive in their latest health status
export const getLatestPositiveUsers = (result) => {
    db.query("SELECT u.`UserID`,u.`FirstName`,u.`LastName`,u.`Telephone`,u.`Email`,hs.`Covid` FROM user u inner join healthstatus hs on u.`UserID` = hs.`PID` inner join (select `PID`, max(`fillOutDate`) maxDate from healthstatus group by `PID`) j0 on hs.`PID` = j0.`PID` and hs.`fillOutDate` = maxDate where hs.`Covid` = 1", (err, results) => {
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