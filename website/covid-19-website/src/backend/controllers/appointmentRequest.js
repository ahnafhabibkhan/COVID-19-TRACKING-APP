// Import function from appointment request Model
import { getAppointmentRequests, insertAppointmentRequest, deleteAppointmentRequest } from "../models/appointmentRequestModel.js";

// Get appointment requests
export const showAppointmentRequests = (req, res) => {
    getAppointmentRequests(req.body, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New appointment request
export const createAppointmentRequest = (req, res) => {
    const data = req.body;
    insertAppointmentRequest(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete appointment request
export const removeAppointmentRequest = (req, res) => {
    const data = req.body;
    deleteAppointmentRequest(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}