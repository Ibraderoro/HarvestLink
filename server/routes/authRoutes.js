const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define a POST route for user registration
router.post('/register', authController.registerUser);

// Define a POST route for user login
router.post('/login', authController.loginUser);

// Export the router for use in other files
module.exports = router;    