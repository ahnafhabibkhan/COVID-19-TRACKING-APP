// import express
import express from "express";

// import function from controller
import { showUserByEmail, createUser, deleteUser } from "../controllers/user.js";
import { showPasswordResetRequestByID, createPasswordResetRequest, deletePasswordResetRequest, updatePasswordResetRequest } from "../controllers/passwordResetRequest.js";

// init express router
const router = express.Router();

////////////USER
// Get Single User
router.get('/users/:email', showUserByEmail);

// Create New User
router.post('/users', createUser);

// Delete User
router.delete('/users/:id', deleteUser);

////////////PASSWORD RESET REQUEST
// Get Single password reset request
router.get('/passwordresetrequest/:id', showPasswordResetRequestByID);

// Create New password reset request
router.post('/passwordresetrequest', createPasswordResetRequest);

// Delete password reset request
router.delete('/passwordresetrequest/:id', deletePasswordResetRequest);

// Update password reset request
router.put('/passwordresetrequest/:id', updatePasswordResetRequest);

// export default router
export default router;