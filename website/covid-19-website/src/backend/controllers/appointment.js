// Import function from appointment Model
import { getAppointments, insertAppointment, deleteAppointment } from "../models/appointmentModel.js";

// Get appointments
export const showAppointments = (req, res) => {
    getAppointments(req.body, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New appointment
export const createAppointment = (req, res) => {
    const data = req.body;
    insertAppointment(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete appointment
export const removeAppointment = (req, res) => {
    const data = req.body;
    deleteAppointment(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}