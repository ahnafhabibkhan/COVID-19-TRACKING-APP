// Import function from notification Model
import { getNotifications, insertNotification, deleteNotification } from "../models/notificationModel.js";

// Get notifications by data
export const showNotifications = (req, res) => {
    getNotifications(req.body, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create notification
export const createNotification = (req, res) => {
    const data = req.body;
    insertNotification(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete notification
export const removeNotification = (req, res) => {
    const data = req.body;
    deleteNotification(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}