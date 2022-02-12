// import express
import express from "express";

// import function from controller
import { showUserByEmail, showUsersByData, createUser, deleteUser, updateUser } from "../controllers/user.js";
import { showPasswordResetRequestByID, createPasswordResetRequest, deletePasswordResetRequest, updatePasswordResetRequest } from "../controllers/passwordResetRequest.js";
import { createAccountRequest, deleteAccountRequest, showAccountRequestByEmail} from "../controllers/accountRequest.js";
import {
    createHealthStatus,
    deleteHealthStatus, deleteHealthStatuses,
    showHealthStatuses,
    showLatestHealthStatus, updateHealthStatus
} from "../controllers/healthStatus.js";
import {showAppointmentRequests, createAppointmentRequest, removeAppointmentRequest} from "../controllers/appointmentRequest.js";
import {createAppointment, removeAppointment, showAppointments} from "../controllers/appointment.js";
import {createAvailability, removeAvailability, showAvailabilities} from "../controllers/doctorAvailability.js";

// init express router
const router = express.Router();

////////////USER
// Get Single User
router.get('/users/:email', showUserByEmail);

// Get Users by data
router.get('/users/', showUsersByData);

// Create New User
router.post('/users', createUser);

// Delete User
router.delete('/users/:id', deleteUser);

// Update a User
router.put('/users/:id', updateUser);

////////////DOCTOR AVAILABILITY
// Get availabilities
router.get('/availability', showAvailabilities);

// Create New availability
router.post('/availability', createAvailability);

// Delete availability
router.delete('/availability', removeAvailability);

////////////APPOINTMENT REQUEST
// Get appointment requests
router.get('/appointmentrequest', showAppointmentRequests);

// Create New appointment request
router.post('/appointmentrequest', createAppointmentRequest);

// Delete appointment request
router.delete('/appointmentrequest', removeAppointmentRequest);

////////////APPOINTMENT
// Get appointments
router.get('/appointment', showAppointments);

// Create New appointment
router.post('/appointment', createAppointment);

// Delete appointment
router.delete('/appointment', removeAppointment);

////////////ACCOUNT REQUEST
// Get Single account request
router.get('/accountrequest/:email', showAccountRequestByEmail);

// Create New account request
router.post('/accountrequest', createAccountRequest);

// Delete account request
router.delete('/accountrequest/:id', deleteAccountRequest);

////////////PASSWORD RESET REQUEST
// Get Single password reset request
router.get('/passwordresetrequest/:id', showPasswordResetRequestByID);

// Create New password reset request
router.post('/passwordresetrequest', createPasswordResetRequest);

// Delete password reset request
router.delete('/passwordresetrequest/:id', deletePasswordResetRequest);

// Update password reset request
router.put('/passwordresetrequest/:id', updatePasswordResetRequest);

////////////HEALTH STATUS
// Get a user's latest health status
router.get('/healthstatus/:pid', showLatestHealthStatus);

// Get a user's health statuses
router.get('/healthstatuses/:pid', showHealthStatuses);

// Create New health status
router.post('/healthstatus', createHealthStatus);

// Delete specific health status
router.delete('/healthstatus/:pid/:fillOutDate', deleteHealthStatus);

// Delete all user's health statuses
router.delete('/healthstatus/:pid', deleteHealthStatuses);

// Update password reset request
router.put('/healthstatus/:pid/:fillOutDate', updateHealthStatus);

// export default router
export default router;
