// Import mongoose for database operations
const mongoose = require('mongoose');

// Define an asynchronous function to connect to the database
const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  try {
    // Attempt to connect to the MongoDB database using the connection string from environment variables
    await mongoose.connect(process.env.DATABASE_URI, {
      autoIndex: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB Database connected successfully.');
  } catch (err) {
    // Log any errors that occur during the connection attempt
    console.error('MongoDB connection failed:', err.message);
    process.exit(1) //  crash immediately
  }
};

// Export the connectDB function for use in other files
module.exports = connectDB;
