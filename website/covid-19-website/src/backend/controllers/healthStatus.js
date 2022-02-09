// Import function from health status Model
import { getLatestHealthStatusByID, getHealthStatusesByID, insertHealthStatus, deleteHealthStatusByPK, deleteHealthStatusByID, updateHealthStatusByPK } from "../models/healthStatusModel.js";

// Get latest user health status
export const showLatestHealthStatus = (req, res) => {
    getLatestHealthStatusByID(req.params.pid, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get user health statuses
export const showHealthStatuses = (req, res) => {
    getHealthStatusesByID(req.params.pid, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create new health status
export const createHealthStatus = (req, res) => {
    const data = req.body;
    insertHealthStatus(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete health status by primary key
export const deleteHealthStatus = (req, res) => {
    deleteHealthStatusByPK(req.body, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete health statuses by patient ID
export const deleteHealthStatuses = (req, res) => {
    deleteHealthStatusByID(req.body, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update health status
export const updateHealthStatus = (req, res) => {
    updateHealthStatusByPK(req.body, req.params.pid, req.params.fillOutDate, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}