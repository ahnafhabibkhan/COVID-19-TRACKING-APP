// Import function from doctor availability Model
import { getAvailabilities, insertAvailability, deleteAvailability } from "../models/doctorAvailabilityModel.js";

// Get availabilites
export const showAvailabilities = (req, res) => {
    getAvailabilities(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New availability
export const createAvailability = (req, res) => {
    const data = req.body;
    insertAvailability(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete availability
export const removeAvailability = (req, res) => {
    const data = req.body;
    deleteAvailability(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}