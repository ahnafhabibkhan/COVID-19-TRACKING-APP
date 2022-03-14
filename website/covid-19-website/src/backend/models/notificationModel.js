// import connection
import db from "../config/db.js";
import {formatWhere} from "../config/db.js";

// Get notifications by data
export const getNotifications = (data, result) => {
    const where = formatWhere(data);
    const query = "SELECT * FROM notification WHERE "+where;
    db.query(query, [where], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Insert notification into Database
export const insertNotification = (data, result) => {
    db.query("INSERT INTO notification SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete notification from Database
export const deleteNotification = (data, result) => {
    const where = formatWhere(data);
    const query = "DELETE FROM notification WHERE "+where;
    db.query(query, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}