// import express
import express from "express";

// import functions from controllers
import { showUserByEmail, showUsers, showUsersByData, showLatestPositiveUsers, createUser, deleteUser, updateUser } from "../controllers/user.js";
import { showPasswordResetRequestByID, createPasswordResetRequest, deletePasswordResetRequest, updatePasswordResetRequest } from "../controllers/passwordResetRequest.js";
import { createAccountRequest, showAccountRequests, deleteAccountRequest, showAccountRequestByEmail} from "../controllers/accountRequest.js";
import { createHealthStatus, deleteHealthStatus, deleteHealthStatuses, showHealthStatuses, showLatestHealthStatus, updateHealthStatus } from "../controllers/healthStatus.js";
import {showAppointmentRequests, createAppointmentRequest, removeAppointmentRequest} from "../controllers/appointmentRequest.js";
import {createAppointment, removeAppointment, showAppointments} from "../controllers/appointment.js";
import {createAvailability, removeAvailability, showAvailabilities} from "../controllers/doctorAvailability.js";
import {createMessage, removeMessage, showMessagesByID} from "../controllers/message.js";

// init express router
const router = express.Router();

////////////USER
// Get Single User by Email
router.get('/users/:email', showUserByEmail);

// Get all Users
router.get('/users', showUsers);

// Get all Users who were covid positive in their latest health status
router.get('/usersByCovid', showLatestPositiveUsers);

// Get Users by data
router.post('/users', showUsersByData);

// Create New User
router.post('/user', createUser);

// Delete User by ID
router.delete('/users/:id', deleteUser);

// Update a User
router.put('/users/:id', updateUser);

////////////DOCTOR AVAILABILITY
// Get availabilities by doctor ID
router.get('/availability/:id', showAvailabilities);

// Create New availability
router.post('/availability', createAvailability);

// Delete availability by data
router.post('/deleteavailability', removeAvailability);

////////////MESSAGE
// Get messages by receiver ID
router.get('/messages/:id', showMessagesByID);

// Create New message
router.post('/messages', createMessage);

// Delete messages by data
router.post('/deletemessages', removeMessage);

////////////APPOINTMENT REQUEST
// Get appointment requests by data
router.post('/appointmentrequests', showAppointmentRequests);

// Create New appointment request
router.post('/appointmentrequest', createAppointmentRequest);

// Delete appointment request by data
router.post('/deleteappointmentrequest', removeAppointmentRequest);

////////////APPOINTMENT
// Get appointments by data
router.post('/appointments', showAppointments);

// Create New appointment
router.post('/appointment', createAppointment);

// Delete appointment by data
router.post('/deleteappointment', removeAppointment);

////////////ACCOUNT REQUEST
// Get Single account request by email
router.get('/accountrequest/:email', showAccountRequestByEmail);

// Get all account requests
router.get('/accountrequests', showAccountRequests);

// Create New account request
router.post('/accountrequest', createAccountRequest);

// Delete account request by user ID
router.delete('/accountrequest/:id', deleteAccountRequest);

////////////PASSWORD RESET REQUEST
// Get Single password reset request by user ID
router.get('/passwordresetrequest/:id', showPasswordResetRequestByID);

// Create New password reset request
router.post('/passwordresetrequest', createPasswordResetRequest);

// Delete password reset request by user ID
router.delete('/passwordresetrequest/:id', deletePasswordResetRequest);

// Update password reset request by user ID
router.put('/passwordresetrequest/:id', updatePasswordResetRequest);

////////////HEALTH STATUS
// Get a user's latest health status by patient ID
router.get('/healthstatus/:pid', showLatestHealthStatus);

// Get a user's health statuses by patient ID
router.get('/healthstatuses/:pid', showHealthStatuses);

// Create New health status
router.post('/healthstatus', createHealthStatus);

// Delete specific health status by key
router.delete('/healthstatus/:pid/:fillOutDate', deleteHealthStatus);

// Delete all user's health statuses
router.delete('/healthstatus/:pid', deleteHealthStatuses);

// Update health status
router.put('/healthstatus/:pid/:fillOutDate', updateHealthStatus);

// export default router
export default router;
