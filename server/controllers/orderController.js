// Import the Order model from the OrderModel file
const Order = require('../models/orderModel');
// Import the Product model from the ProductModel file
const Product = require('../models/productModel');

const OrderController = {
  // Function to place an order
  const mongoose = require('mongoose');

  placeOrder: async (req, res) => {
    // Extract productId and quantity from the request body
    const { productId, quantity } = req.body;
    const userId = req.user.userId; // Assuming userId is set in req.user by authentication middleware
    const session = await mongoose.startSession();
    session.startTransaction();
    console.log(
      `Received request to place order for productId: ${productId}, quantity: ${quantity}`
    );
    try {
      // Find the product by its ID
      const product = await Product.findById(productId);
      console.log(`Product found: ${product}`);
      // If product not found, send a 404 error response
      if (!product || product.quantity < quantity) {
      //If product not found, abort transaction and send 400 error response
        await session.abortTransaction();
        return res.status(400).json({ error: 'Product unavailable.' });
      }
    

      // Deduct the ordered quantity from the product's stock
      product.quantity -= quantity;
      // Save the updated product to the database
      await product.save({ session });
      console.log(`Product stock updated. New quantity: ${product.quantity}`);
      // Create a new order with the productId, quantity, and buyer information
      const order = new Order({ productId, quantity, buyer: userId });
      // Save the new order to the database
      await order.save({ session });
      console.log('Order placed successfully.');

      // Send a success message as a JSON response with status 201
      await session.commitTransaction();
      session.endSession();
      res.status(201).json({ message: 'Order placed successfully.' });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      console.error('An error occurred while placing the order:', error);
      // Send an error message as a JSON response with status 500
      res
        .status(500)
        .json({ error: 'An error occurred while placing the order.' });
    }
  },
};

// Export the OrderController object for use in other files
module.exports = OrderController;
