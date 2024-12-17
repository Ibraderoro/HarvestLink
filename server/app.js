// Import the routes for handling order-related requests
const orderRoutes = require('./routes/orderRoutes');
// Import the routes for handling product-related requests
const productRoutes = require('./routes/productRoutes');
// Import the routes for handling user-related requests
const userRoutes = require('./routes/userRoutes');
// const cors = require('cors');
// Import the Express.js framework
const express = require('express');
const app = express();
const path = require('path'); // Add this line
// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   cors({
//     origin: 'http://localhost:3001',
//   })
// ); // Allow requests from your React app
// Use the order routes for requests to /orders
app.use('/api/orders', orderRoutes);

// Use the user routes for requests to /users
app.use('/api/users', userRoutes);

// Use the product routes for requests to /products
app.use('/api/products', productRoutes);
// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve the index.html file for any unknown routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Export the app for use in other files
module.exports = app;
