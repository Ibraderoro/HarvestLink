// Import mongoose for database operations
const mongoose = require('mongoose');

// Mongoose schema and model for a product
const productSchema = new mongoose.Schema({
  // Define the name field with type String and a required validation message
  name: {
    type: String,
    required: [true, 'A product must have a name']
  },
  // Define the price field with type Number and a required validation message
  price: {
    type: Number,
    required: [true, 'A product must have a price']
  },
  // Define the quantity field with type Number and a required validation message
  quantity: {
    type: Number,
    required: [true, 'A product must have a quantity']
  },
  image: {
    type: String,
    required: [true, 'A product must have an image']
  }
});

// Export the Product model through module.exports
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
