// import connection
import db from "../config/db.js";
import {formatWhere} from "../config/db.js";

// Get messages by receiverID
export const getMessagesByID = (id, result) => {
    db.query("SELECT * FROM message WHERE ReceiveUserID = ?", [id], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Insert message to Database
export const insertMessage = (data, result) => {
    db.query("INSERT INTO message SET ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Delete message from Database
export const deleteMessage = (data, result) => {
    const where = formatWhere(data);
    const query = "DELETE FROM message WHERE "+where;
    db.query(query, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}