// Import the Order model from the OrderModel file
const Order = require('../models/orderModel');
// Import the Product model from the ProductModel file
const Product = require('../models/productModel');

const OrderController = {
  // Function to place an order
  placeOrder: async (req, res) => {
    // Extract productId and quantity from the request body
    const { productId, quantity } = req.body;
    console.log(
      `Received order request for product ID: ${productId} with quantity: ${quantity}`
    );
    try {
      // Find the product by its ID
      const product = await Product.findById(productId);
      console.log(`Product found: ${product}`);
      // If product not found, send a 404 error response
      if (!product) {
        console.log('Product not found.');
        return res.status(404).json({ error: 'Product not found.' });
      }
      // Check if sufficient quantity is available
      if (product.quantity < quantity) {
        console.log('Insufficient quantity.');
        return res.status(400).json({ error: 'Insufficient quantity.' });
      }

      // Deduct the ordered quantity from the product's stock
      product.quantity -= quantity;
      // Save the updated product to the database
      await product.save();
      console.log(`Product stock updated. New quantity: ${product.quantity}`);
      // Create a new order with the productId, quantity, and buyer information
      const order = new Order({ productId, quantity, buyer: 'guest' });
      // Save the new order to the database
      await order.save();
      console.log('Order placed successfully.');

      // Send a success message as a JSON response with status 201
      res.status(201).json({ message: 'Order placed successfully.' });
    } catch (error) {
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
