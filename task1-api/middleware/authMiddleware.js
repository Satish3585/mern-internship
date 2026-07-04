const jwt = require('jsonwebtoken')
const User = require('../models/User')
const CustomError = require('./customError')

// ─────────────────────────────────────
// protect — Checks if user is logged in
// Used on routes that need authentication
// ─────────────────────────────────────
const protect = async (req, res, next) => {
  try {
    let token

    // JWT is sent in header like this:
    // Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Extract just the token part (remove "Bearer ")
      token = req.headers.authorization.split(' ')[1]
    }

    // No token found at all
    if (!token) {
      return next(new CustomError('Not authorized, no token provided', 401))
    }

    // Verify token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // decoded.id was stored when we created the token (remember signup/login?)
    // Find that user and attach to request object
    req.user = await User.findById(decoded.id)

    if (!req.user) {
      return next(new CustomError('User no longer exists', 401))
    }

    // Everything good! Continue to the actual route
    next()

  } catch (error) {
    return next(new CustomError('Not authorized, token failed', 401))
  }
}

module.exports = { protect }