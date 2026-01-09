// Import the Product model from the productModel file
const Product = require('../models/productModel');

const ProductController = {
  // Function to create a new product
  async createProduct(req, res) {
    try {
      // Extract name, price, and quantity from the request body
      const { name, price, quantity, image } = req.body;
      // Create a new product instance with the extracted data
      const newProduct = new Product({ name, price, quantity, image });
      // Save the new product to the database
      const product = await newProduct.save();
      // Log success message to the console
      console.log('Product added successfully.');
      // Send the created product as a JSON response with status 200
      res.status(200).json(product);
    } catch (err) {
      // Log error message to the console
      console.error('Error: Product cannot be added:', err);
      // Send error message as a JSON response with status 500
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  // Function to update an existing product
  async updateProduct(req, res) {
    try {
      // Extract product ID from the request parameters
      const { id } = req.params;
      // Extract name, price, and quantity from the request body
      const { name, price, quantity, image } = req.body;
      
      // Find the product by ID and update it with the new data
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // If the product is not found, send a 404 error response
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
      // Log success message to the console
      console.log('Product updated successfully.');
      // Send the updated product as a JSON response with status 200
      res.status(200).json(product);
    } catch (err) {
      // Log error message to the console
      console.error('Error: Product cannot be updated:', err);
      // Send error message as a JSON response with status 500
      res.status(500).json({ error: err.message });
    }
  },

  // Function to delete an existing product
  async deleteProduct(req, res) {
    try {
      // Extract product ID from the request parameters
      const { id } = req.params;
      // Find the product by ID and delete it from the database
      const product = await Product.findByIdAndDelete(id);
      // If the product is not found, send a 404 error response
      if (!product) {
        return res.status(404).json({ error: 'Product not found.' });
      }
      // Log success message to the console
      console.log('Product deleted successfully.');
      // Send the deleted product as a JSON response with status 200
      res.status(200).json(product);
    } catch (err) {
      // Log error message to the console
      console.error('Error: Product cannot be deleted:', err);
      // Send error message as a JSON response with status 500
      res.status(500).json({ error: 'An error occurred' });
    }
  },

  // Function to get all products
  async getProducts(req, res) {
    try {
      // Find all products in the database
      const products = await Product.find();
      // Log success message to the console
      console.log('Products retrieved successfully.');
      // Send the retrieved products as a JSON response with status 200
      res.status(200).json(products);
    } catch (err) {
      // Log error message to the console
      console.error('Error finding products:', err);
      // Send error message as a JSON response with status 500
      res.status(500).json({ error: 'An error occurred' });
    }
  },
};

// Export the ProductController object for use in other files
module.exports = ProductController;
