// Import the User model from the User file
const User = require('../models/userModel');

const UserController = {
  // Function to create a new user
  createUser: async (req, res) => {
    // Extract username, password, and role from the request body
    const { username, password, role } = req.body;
    console.log(`Received request to create user: ${username}`);

    try {
      // Create a new user instance
      const user = new User({ username, password, role });
      // Save the new user to the database
      await user.save();
      console.log('User created successfully.');

      // Send a success message as a JSON response with status 201
      res.status(201).json('User created successfully.');
    } catch (error) {
      console.error('An error occurred while creating the user:', error);
      // Send an error message as a JSON response with status 500
      res.status(500).json('An error occurred while creating the user.');
    }
  },

  // Function to get all users
  getAllUsers: async (req, res) => {
    console.log('Received request to get all users.');

    try {
      // Find all users in the database
      const users = await User.find();
      console.log('Users retrieved successfully.');

      // Send the retrieved users as a JSON response
      res.json(users);
    } catch (error) {
      console.error('An error occurred while fetching users:', error);
      // Send an error message as a JSON response with status 500
      res.status(500).json('An error occurred while fetching users.');
    }
  },

  // Function to get a single user by ID
  getUserById: async (req, res) => {
    // Extract user ID from the request parameters
    const { id } = req.params;
    console.log(`Received request to get user with ID: ${id}`);

    try {
      // Find the user by its ID
      const user = await User.findById(id);
      // If user not found, send a 404 error response
      if (!user) {
        console.log('User not found.');
        return res.status(404).json('User not found.');
      }

      console.log('User retrieved successfully.');
      // Send the retrieved user as a JSON response
      res.send(user);
    } catch (error) {
      console.error('An error occurred while fetching the user:', error);
      // Send an error message as a JSON response with status 500
      res.status(500).json('An error occurred while fetching the user.');
    }
  },

  // Function to update user details
  updateUser: async (req, res) => {
    // Extract user ID from the request parameters
    const { id } = req.params;
    // Extract username and role from the request body
    const { username, role } = req.body;
    console.log(`Received request to update user with ID: ${id}`);

    try {
      // Find the user by its ID
      const user = await User.findById(id);
      // If user not found, send a 404 error response
      if (!user) {
        console.log('User not found.');
        return res.status(404).json('User not found.');
      }

      // Update the user's details
      user.username = username || user.username;
      user.role = role || user.role;
      // Save the updated user to the database
      await user.save();
      console.log('User updated successfully.');

      // Send a success message as a JSON response
      res.json('User updated successfully.');
    } catch (error) {
      console.error('An error occurred while updating the user:', error);
      // Send an error message as a JSON response with status 500
      res.status(500).json('An error occurred while updating the user.');
    }
  },

  // Function to delete a user
  deleteUser: async (req, res) => {
    // Extract user ID from the request parameters
    const { id } = req.params;
    console.log(`Received request to delete user with ID: ${id}`);

    try {
      // Find the user by its ID and delete it from the database
      const user = await User.findByIdAndDelete(id);
      // If user not found, send a 404 error response
      if (!user) {
        console.log('User not found.');
        return res.status(404).send('User not found.');
      }

      console.log('User deleted successfully.');
      // Send a success message as a JSON response
      res.status(200).json('User deleted successfully.');
    } catch (error) {
      console.error('An error occurred while deleting the user:', error);
      // Send an error message as a JSON response with status 500
      res.status(500).json('An error occurred while deleting the user.');
    }
  },
};

// Export the UserController object for use in other files
module.exports = UserController;
