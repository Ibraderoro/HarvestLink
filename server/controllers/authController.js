// Import authenticacation module
const { registerUser, loginUser } = require('../services/authService');
const AuthController = {
  // Function to handle user registration
  registerUser: async (req, res) => {
    try {
      const { username, password, role, email } = req.body;
      // Call the registerUser function from authModel
      const user = await registerUser(username, password, role, email);
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          email: user.email,
        },
      });
    } catch (error) {
      if (error.message === 'User already exists') {
        return res.status(409).json({ error: 'User already exists' });
      }
      console.error('Eror registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Function to handle user login
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body;
      // Call the loginUser function from authModel
      const token = await loginUser(username, password);
      res.status(200).json({
        message: 'Login successful',
        token,
        tokenType: 'Bearer',
        expiresIn: '1d',
      });
    } catch (error) {
      console.error('Login failed:', error);
      res.status(401).json({ error: 'Invalid credentials' });
    }
  },
};

// Export the AuthController object for use in other files
module.exports = AuthController;
