const mongoose = require('mongoose');
// Import the Order model from the OrderModel file
const Order = require('../models/orderModel');
// Import the Product model from the ProductModel file
const Product = require('../models/productModel');

const OrderController = {
  // Function to place an order
  placeOrder: async (req, res) => {
    // Extract productId and quantity from the request body
    const { productId, quantity } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (
      !productId ||
      quantity <= 0 ||
      !mongoose.Types.ObjectId.isValid(productId)
    ) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    const userId = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ error: 'Invalid user session' });
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      // Find the product and update stock
      const product = await Product.findOneAndUpdate(
        { _id: productId, quantity: { $gte: quantity } },
        { $inc: { quantity: -quantity } },
        { new: true, session }
      );

      // If product not found, throw an error
      if (!product) {
        const error = new Error('Product unavailable');
        error.statusCode = 400;
        throw error;
      }
      // Create a new order with the productId, quantity, and buyer information
      const [order] = await Order.create(
        [
          {
            productId,
            quantity,
            buyer: userId,
          },
        ],
        // Save the updated product to the database
        { session }
      );
      await session.commitTransaction();

      // Send a success message as a JSON response with status 201
      res.status(201).json({
        message: 'Order placed successfully',
        order,
      });
    } catch (error) {
      await session.abortTransaction();

      console.error('Order transaction failed:', error.message);

      // Send an error message as a JSON response with status 400
      res
        .status(error.statusCode || 500)
        .json({ error: error.message || 'Order failed' });
    } finally {
      session.endSession();
    }
  },
};

// Export the OrderController object for use in other files
module.exports = OrderController;
