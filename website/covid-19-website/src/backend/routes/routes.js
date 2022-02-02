// import express
import express from "express";

// import function from controller
import { showUserByEmail, createUser, deleteUser } from "../controllers/user.js";

// init express router
const router = express.Router();

// Get Single User
router.get('/users/:email', showUserByEmail);

// Create New User
router.post('/users', createUser);

// Delete Product
router.delete('/users/:id', deleteUser);

// export default router
export default router;