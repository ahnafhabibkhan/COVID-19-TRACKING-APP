// Import nodemail stuff
import transporter from "../config/email.js";

// Import function from Password Reset Request Model
import { getPasswordResetRequestByID, insertPasswordResetRequest, deletePasswordResetRequestById, updatePasswordResetRequestById } from "../models/passwordResetRequestModel.js";

// Get Single Request by ID
export const showPasswordResetRequestByID = (req, res) => {
    getPasswordResetRequestByID(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Create New Request
export const createPasswordResetRequest = (req, res) => {
    console.log(`Create password request called with key: ${req.body.Key} for email: ${req.body.Email}`);
    const data = req.body;
    insertPasswordResetRequest(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });

    const mailData = {
        from: 'soen390proj@gmail.com',  // sender address
        to: data.Email,   // list of receivers
        subject: 'SOEN390 Password Reset Request',
        text: 'That was easy!',
        html: `<b>A request was done to reset your password</b><br>Here is your key: ${data.Key}`,
    };

    transporter.sendMail(mailData, function (err, info) {
        if(err)
            console.log(err);
        else
            console.log(info);
    });
}

// Delete Request
export const deletePasswordResetRequest = (req, res) => {
    const id = req.params.id;
    deletePasswordResetRequestById(id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

// Update Request
export const updatePasswordResetRequest = (req, res) => {
    const data  = req.body;
    const id    = req.params.id;
    updatePasswordResetRequestById(data, id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });

    const mailData = {
        from: 'soen390proj@gmail.com',  // sender address
        to: data.Email,   // list of receivers
        subject: 'SOEN390 Password Reset Request',
        text: 'That was easy!',
        html: `<b>A request was done to reset your password</b><br>Here is your key: ${data.Key}`,
    };

    transporter.sendMail(mailData, function (err, info) {
        if(err)
            console.log(err);
        else
            console.log(info);
    });
}