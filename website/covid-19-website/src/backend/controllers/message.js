// Import function from message Model
import { getMessagesByID, insertMessage, deleteMessage } from "../models/messageModel.js";

// Get messages by receiver ID
export const showMessagesByID = (req, res) => {
    getMessagesByID(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create message
export const createMessage = (req, res) => {
    const data = req.body;
    insertMessage(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete message
export const removeMessage = (req, res) => {
    const data = req.body;
    deleteMessage(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}