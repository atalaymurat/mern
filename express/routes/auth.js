const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConf = require('../passport.js'); // Ensure this configures Passport strategies
const authsController = require('../controllers/auths.js');
const rateLimit = require('express-rate-limit');

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply rate limiter to the /login and /validate routes
router.post('/login', limiter, passport.authenticate('local', { session: false }), authsController.login);
router.get('/validate', limiter, authsController.validate);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = router;