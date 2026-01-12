// Import mongoose from the mongoose package
const mongoose = require('mongoose');
// Import bcrypt for password hashing
const bcrypt = require('bcrypt');
// Import the User model from the User file
const User = require('../models/userModel');

const SALT_ROUNDS = 10;

const UserController = {
  // Function to create a new user
  async createUser(req, res) {
    try {
      // Extract username, password, and role from the request body
      const { username, password, role } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ error: 'Username and password are required' });
      }

      // Check the legth of the password
      if (password.length < 6) {
        return res
          .status(400)
          .json({ error: 'Password must be at least 6 characters long' });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
      }

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      // Create a new user instance with the extracted data
      const allowedRoles = ['admin', 'user'];
      const user = await User.create({
        username,
        password: hashedPassword,
        role: allowedRoles.includes(role) ? role : 'user',
      });

      // Log success message to the console
      console.log('User created successfully.');
      // Send the created user as a JSON response with status 201
      res.status(201).json({
        message: 'User created successfully',
        user: { id: user._id, username: user.username, role: user.role },
      });
    } catch (err) {
      // Log error message to the console
      console.error('Error: User cannot be created:', err);
      // Send error message as a JSON response with status 500
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  // Function to get all users
  async getAllUsers(req, res) {
    console.log('Received request to get all users.');

    try {
      // Find all users in the database
      const users = await User.find().select('-password'); // Exclude passwords from the result
      console.log('Users retrieved successfully.');

      // Send the retrieved users as a JSON response
      res.json(users);
    } catch (error) {
      console.error('Fetch users error:', error);
      // Send an error message as a JSON response with status 500
      res
        .status(500)
        .json({ error: 'An error occurred while fetching users.' });
    }
  },

  // Function to get a single user by ID
  async getUserById(req, res) {
    try {
      // Extract user ID from the request parameters
      const { id } = req.params;
      console.log(`Received request to get user with ID: ${id}`);

      // Check if the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Invalid user ID format.');
        return res.status(400).json({ error: 'Invalid user ID format.' });
      }

      // Find the user by its ID
      const user = await User.findById(id).select('-password'); // Exclude password from the result
      // If user not found, send a 404 error response
      if (!user) {
        console.log('User not found.');
        return res.status(404).json({ error: 'User not found.' });
      }

      console.log('User retrieved successfully.');
      // Send the retrieved user as a JSON response
      res.status(200).json(user);
    } catch (error) {
      console.error('An error occurred while fetching the user:', error);
      // Send an error message as a JSON response with status 500
      res
        .status(500)
        .json({ error: 'An error occurred while fetching the user.' });
    }
  },

  // Function to update user details
  async updateUser(req, res) {
    try {
      // Extract user ID from the request parameters
      const { id } = req.params;
      // Extract username and role from the request body
      const { username, role } = req.body;
      console.log(`Received request to update user with ID: ${id}`);

      // Check if the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Invalid user ID format.');
        return res.status(400).json({ error: 'Invalid user ID format.' });
      }
      const update = {};
      // Validate and prepare the fields to be updated
      if (username) update.username = username;
      if (role) update.role = role;

      // Find the user by its ID
      const user = await User.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
      }).select('-password'); // Exclude password from the result

      // If user not found, send a 404 error response
      if (!user) {
        console.log('User not found.');
        return res.status(404).json({ error: 'User not found.' });
      }

      // Send a success message as a JSON response
      res.status(200).json({ message: 'User updated successfully.', user });
      console.log('User updated successfully.');
    } catch (error) {
      console.error('Update user error:', error);
      // Send an error message as a JSON response with status 500
      res
        .status(500)
        .json({ error: 'An error occurred while updating the user.' });
    }
  },

  // Function to delete a user
  async deleteUser(req, res) {
    try {
      // Extract user ID from the request parameters
      const { id } = req.params;
      console.log(`Received request to delete user with ID: ${id}`);
      // Check if the provided ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log('Invalid user ID format.');
        return res.status(400).json({ error: 'Invalid user ID format.' });
      }

      // Find the user by its ID and delete it from the database
      const user = await User.findByIdAndDelete(id);
      // If user not found, send a 404 error response
      if (!user) {
        console.log('User not found.');
        return res.status(404).json({ error: 'User not found.' });
      }

      console.log('User deleted successfully.');
      // Send a success message as a JSON response
      res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error('Delete the user error:', error);
      // Send an error message as a JSON response with status 500
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },
};

// Export the UserController object for use in other files
module.exports = UserController;
