// Import function from user Model
import { getUserByEmail, insertUser, deleteUserById } from "../models/userModel.js";

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