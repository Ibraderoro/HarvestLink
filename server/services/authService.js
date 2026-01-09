const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Controller function to handle user registration
exports.registerUser = async (username, password, role, email) => {
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error('USER_EXISTS');
  }
  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user instance
  const user = new User({
    username,
    password: hashedPassword,
    role,
    email,
  });

  // Save the user to the database
  await user.save();
  return user;
};

// Controller function to handle user login
exports.loginUser = async (username, password) => {
  // Find the user by username
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('INVALID_CREDENTIALS');
  }

  // Generate a JWT token
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};
