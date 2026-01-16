// Import mongoose for database operations
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Mongoose schema and model for a User
const userSchema = new mongoose.Schema(
  {
    // Define the username field with type String and a required validation message
    username: {
      type: String,
      required: [true, 'A user must have a username'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      index: true,
    },

    // Define the email field with type String and a required validation message
    email: {
      type: String,
      required: [true, 'A user must have an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
      index: true,
    },
    // Define the password field with type String and a required validation message
    password: {
      type: String,
      required: [true, 'A user must have a password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, //never return passowrd unless explicitly requested
    },
    // Define the role field with type String and a required validation message
    role: {
      type: String,

      enum: ['user', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true, // soft-delete / ban-ready
    },

    passwordChangedAt: Date,
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the User model through module.exports
module.exports = mongoose.model('User', userSchema);
