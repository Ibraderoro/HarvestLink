// Import the Product model from the productModel file
const mongoose = require('mongoose');
const Product = require('../models/productModel');

const ProductController = {
  // Function to create a new product
  async createProduct(req, res) {
    try {
      // Extract name, price, and quantity from the request body
      const { name, price, quantity, image } = req.body;

      if (!name || price <= 0 || quantity < 0) {
        return res.status(400).json({ error: 'Invalid product data' });
      }
      // Create a new product instance with the extracted data
      const product = await Product.create({ name, price, quantity, image });

      // Log success message to the console
      console.log('Product added successfully.');
      // Send the created product as a JSON response with status 201
      res.status(201).json(product);
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

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }

      if (
        (price !== undefined && price <= 0) ||
        (quantity !== undefined && quantity < 0)
      ) {
        return res.status(400).json({ error: 'Invalid update data' });
      }

      const updates = {};
      if (name !== undefined) updates.name = name;
      if (price !== undefined) updates.price = price;
      if (quantity !== undefined) updates.quantity = quantity;
      if (image !== undefined) updates.image = image;

      // Find the product by ID and update it with the new data
      const product = await Product.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
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
  // Function to get all products
  async getProducts(req, res) {
    try {
      const page = Math.max(parseInt(req.query.page) || 1, 1);
      const limit = Math.min(parseInt(req.query.limit) || 10, 50);

      const skip = (page - 1) * limit;

      const { minPrice, maxPrice, search } = req.query;

      const query = {};

      // Price filtering
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      // Text search
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }

      const [products, total] = await Promise.all([
        Product.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
        Product.countDocuments(query),
      ]);

      res.status(200).json({
        data: products,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  },

  // Function to delete an existing product
  async deleteProduct(req, res) {
    try {
      // Extract product ID from the request parameters
      const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid product ID.' });
      }

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
};

// Export the ProductController object for use in other files
module.exports = ProductController;
