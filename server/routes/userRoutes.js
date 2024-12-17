// Import the express module for creating the router
const express = require('express');

// Import the createUser, getAllUsers, getUserById, updateUser, and deleteUser functions from the userController file
// const {
//   createUser,
//   getAllUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// } = require('../controllers/userController');
const userController = require('../controllers/userController');

// Create a new router instance
const userRouter = express.Router();

// Define a POST route to create a user
userRouter.post('/', userController.createUser);

// Define a GET route to get all users
userRouter.get('/', userController.getAllUsers);

// Define a GET route to get a user by their ID
userRouter.get('/:id', userController.getUserById);

// Define a PUT route to update a user by their ID
userRouter.put('/:id', userController.updateUser);

// Define a DELETE route to delete a user by their ID
userRouter.delete('/:id', userController.deleteUser);

// Export the router for use in other files
module.exports = userRouter;
