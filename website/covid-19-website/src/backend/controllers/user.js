// Import function from user Model
import { getUserByEmail, getUsers, getUsersByData, getLatestPositiveUsers, insertUser, deleteUserById, modifyUser } from "../models/userModel.js";

// Get Single User by Email
export const showUserByEmail = (req, res) => {
    getUserByEmail(req.params.email, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Single User by Email
export const showUsers = (req, res) => {
    getUsers((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get Users by data
export const showUsersByData = (req, res) => {
    const data = req.body;
    getUsersByData(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get basic data for Users that were covid positive in their latest health status
export const showLatestPositiveUsers = (req, res) => {
    getLatestPositiveUsers((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New User
export const createUser = (req, res) => {
    const data = req.body;
    insertUser(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete User
export const deleteUser = (req, res) => {
    const id = req.params.id;
    deleteUserById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update user
export const updateUser = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    modifyUser(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}