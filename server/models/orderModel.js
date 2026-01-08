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
    },
    // Define the buyer field with type String and a required validation message
    buyer: {
      type: String,
      default: 'guest',
    },
    // Define the orderDate field with type Date and a default value of current date
    orderDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Model export through module.exports
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
