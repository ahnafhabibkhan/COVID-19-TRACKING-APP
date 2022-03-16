// Import function from message Model
import { getMessagesByID, getMessages, getMessagesBetween, insertMessage, deleteMessage, modifyMessage } from "../models/messageModel.js";

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

// Get messages by data
export const showMessagesByData = (req, res) => {
    getMessages(req.body, (err, results) => {
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

// Update a message
export const updateMessage = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    modifyMessage(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}