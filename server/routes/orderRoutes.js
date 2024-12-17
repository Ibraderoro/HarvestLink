// Import the express module for creating the router
const express = require('express');
// Import the placeOrder function from the orderController file
const orderController = require('../controllers/orderController');

// Create a new router instance
const router = express.Router();

// Define a POST route to place an order
router.post('/', orderController.placeOrder);

// Export the router for use in other files
module.exports = router;
