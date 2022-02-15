// import connection
import db from "../config/db.js";

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
    db.query("DELETE FROM message WHERE ?", [data], (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}