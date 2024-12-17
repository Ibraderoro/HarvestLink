// Import the app module from the app file
const express = require('express');
const path = require('path');
const app = require('./app');
// Import mongoose for database operations

const mongoose = require('mongoose');
// Load environment variables from a .env file into process.env
require('dotenv').config();
// Import the connectDB function from the db file
const connectDB = require('../server/db'); // Corrected path

// Import the jsonwebtoken module for handling JWTs (commented out)
// const jwt = require('jsonwebtoken'); // https://www.geeksforgeeks.org/json-web-token-jwt/
// Import the bcrypt module for password hashing (commented out)
// const bcrypt = require('bcrypt');

// Connect to MongoDB using the connectDB function
connectDB();

// Set the port number for the server
const PORT = 5000;

// // Serve static files from the 'dist' directory
// app.use(express.static(path.join(__dirname, 'dist')));

// // Serve the index.html file for any unknown routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist', 'index.html'));
// });

// Middleware to parse JSON data
app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Start the server and listen on the specified port once the database connection is open
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
});
