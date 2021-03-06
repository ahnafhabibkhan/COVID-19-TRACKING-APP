// Import function from account request Model
import { getAccountRequestByEmail, getAccountRequests, insertAccountRequest, deleteAccountRequestByEmail } from "../models/accountRequestModel.js";

// Get Single account request by Email
export const showAccountRequestByEmail = (req, res) => {
    getAccountRequestByEmail(req.params.email, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Get all account requests
export const showAccountRequests = (req, res) => {
    getAccountRequests((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New account request
export const createAccountRequest = (req, res) => {
    const data = req.body;
    insertAccountRequest(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Delete account request
export const deleteAccountRequest = (req, res) => {
    const email = req.params.email;
    deleteAccountRequestByEmail(email, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}