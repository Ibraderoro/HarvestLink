// Import mongoose for database operations
const mongoose = require('mongoose');

// Mongoose schema and model for a product
const productSchema = new mongoose.Schema(
  {
    // Define the name field with type String and a required validation message
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      trim: true,
      minlength: [2, 'Product name must be at least 2 characters'],
      index: true,
    },
    // Define the price field with type Number and a required validation message
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
      min: [0, 'Price cannot be negative'],
    },
    // Define the quantity field with type Number and a required validation message
    quantity: {
      type: Number,
      required: [true, 'A product must have a quantity'],
      min: [0, 'Quantity cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'A product must have an image'],
    },
    // Define the description field with type String
    description: {
      type: String,
      required: [true, 'A product must have a description'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    category: {
      type: String,
      trim: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true, //soft-delete ready
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//Virtual field
productSchema.virtual('inStock').get(function () {
  return this.quantity > 0;
});

// Text search index
productSchema.index({ name: 'text', description: 'text' });

// Export the Product model through module.exports
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
