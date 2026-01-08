// Import the express module for creating the router
const express = require('express');

// Import the addProduct, updateProduct, deleteProduct, and getProducts functions from the productController file
// const {
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   getProducts,
// } = require('../controllers/productController');

const productController = require('../controllers/productController');
// Create a new router instance
const router = express.Router();
// Define a GET route to get all products
router.get('/', productController.getProducts);

// Define a POST route to add a product
router.post('/', productController.createProduct);

// Define a PUT route to update a product by its ID
router.put('/:id', productController.updateProduct);

// Define a DELETE route to delete a product by its ID
router.delete('/:id', productController.deleteProduct);

// Export the router for use in other files
module.exports = router;
