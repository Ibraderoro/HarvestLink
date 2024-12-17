// Import mongoose for database operations
const mongoose = require('mongoose');

// Mongoose schema and model for a User
const userSchema = new mongoose.Schema({
  // Define the username field with type String and a required validation message
  username: {
    type: String,
    required: [true, 'A user must have a username'],
  },
  // Define the password field with type String and a required validation message
  password: {
    type: String,
    required: [true, 'A user must have a password'],
  },
  // Define the role field with type String and a required validation message
  role: {
    type: String,
    required: [true, 'A user must have a role'],
  },
});

// Export the User model through module.exports
const User = mongoose.model('User', userSchema);
module.exports = User;
