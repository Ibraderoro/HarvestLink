// Import the Express.js framework
const express = require('express');
const path = require('path'); // Add this line
//Import helmet for security
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

//Import authentication routes
const authRoutes = require('./routes/authRoutes');
// Import the routes for handling order-related requests
const orderRoutes = require('./routes/orderRoutes');
// Import the routes for handling product-related requests
const productRoutes = require('./routes/productRoutes');
// Import the routes for handling user-related requests
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware to parse URL-encoded data and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));
app.use(helmet());

// Rate limiting middleware to limit repeated requests to public APIs
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

//API Routes
// Use the authentication routes for requests to /auth
app.use('/api/auth', authRoutes);
// Use the order routes for requests to /orders
app.use('/api/orders', orderRoutes);
// Use the user routes for requests to /users
app.use('/api/users', userRoutes);
// Use the product routes for requests to /products
app.use('/api/products', productRoutes);

// For Frontend Production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the 'dist' directory
  app.use(express.static(path.join(__dirname, 'dist')));

  // Serve the index.html file for any unknown routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}
// Global error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  console.error(err.log || err.message),
    res.status(status).json({
      error: err.message || 'An error occurred',
    });
});

// Export the app for use in other files
module.exports = app;
