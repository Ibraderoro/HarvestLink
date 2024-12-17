// Import mongoose for database operations
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the database
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the connection string from environment variables
    await mongoose.connect(process.env.DATABASE_URI);
    console.log('MongoDB Database connected successfully.');
  } catch (err) {
    // Log any errors that occur during the connection attempt
    console.error('MongoDB connection error:', err);
  }
};

// Export the connectDB function for use in other files
module.exports = connectDB;
