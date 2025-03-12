const JWT = require('jsonwebtoken');

module.exports = {
  login: async (req, res, next) => {
    try {
      const user = req.user; // User object from Passport
      console.log("LOGIN :", user)
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Sign a JWT token
      const token = JWT.sign(
        {
          iss: 'apiSalesman',
          sub: user._id,
          iat: Math.floor(Date.now() / 1000), // Issued at (in seconds)
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
        },
        process.env.JWT_SECRET
      );

      const isProduction = process.env.NODE_ENV === 'production';
      console.log("COOKIE SETS ENV isProduction", isProduction  )

      // Set the token in an HTTP-only cookie
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: isProduction, // Only send over HTTPS in production
        sameSite: isProduction ? 'none' : 'lax', // Allow cross-site cookies
        path: '/', // Ensure the cookie is accessible across all routes
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      });

      // Send a success response
      res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      next(error); // Pass errors to the error-handling middleware
    }
  },

  validate: async (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("TOKEN", token)

    // Check if the token exists
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // Verify the token
      const decoded = JWT.verify(token, process.env.JWT_SECRET);

      // Send a success response with the decoded user data
      res.status(200).json({ message: 'Authenticated', user: decoded });
    } catch (error) {
      // Handle token verification errors
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      }
      next(error); // Pass other errors to the error-handling middleware
    }
  },
};