// Import mongoose for database operations
const mongoose = require('mongoose');

// Mongoose schema and model for order
const orderSchema = new mongoose.Schema(
  {
    // Define the productId field with type String and a required validation message
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'An order must have a productId'],
    },
    // Define the quantity field with type Number and a required validation message
    quantity: {
      type: Number,
      required: [true, 'An order must have a quantity'],
      min: [1, 'Quantity must be at least 1'],
      validate: {
        validator: Number.isInteger,
        message: 'Quantity must be an integer',
      },
    },
    // Define the buyer field with type String and a required validation message
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'An order must have a buyer'],
    },
    // Define the status field with type String and a default value of 'guest'
    status: {
      type: String,
      enum: ['pending', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Model export through module.exports
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
