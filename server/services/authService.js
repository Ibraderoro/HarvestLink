const monggose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Controller function to handle user registration
exports.registerUser = async (req, res) => {
  try {
    const { username, password, role, email } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      email,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// Controller function to handle user login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};