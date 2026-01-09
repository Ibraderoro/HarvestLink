// Load environment variables from a .env file into process.env
require('dotenv').config();
// Import mongoose for database operations
const mongoose = require('mongoose');
// Import the app module from the app file
const app = require('./app');

// Import the connectDB function from the db file
const connectDB = require('./db'); // Corrected path
if (!process.env.DATABASE_URI) {
  console.error('DATABASE_URI is missing');
  process.exit(1);
}
// Environment validation (FAIL FAST)
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing');
  process.exit(1);
}

// Set the port number for the server
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using the connectDB function
connectDB();
// Start server only AFTER DB is connected
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');

  // Start the server and listen on the specified port once the database connection is open
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
});

// Catch DB errors
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});
