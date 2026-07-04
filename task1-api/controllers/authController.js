const User = require('../models/User')
const jwt = require('jsonwebtoken')
const CustomError = require('../middleware/customError')

// ─────────────────────────────────────
// Helper function — Generate JWT Token
// ─────────────────────────────────────
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },              // payload — data stored inside token
    process.env.JWT_SECRET,      // secret key to sign token
    { expiresIn: process.env.JWT_EXPIRE }  // when token expires
  )
}

// ─────────────────────────────────────
// POST /api/auth/signup
// ─────────────────────────────────────
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return next(new CustomError('Please provide name, email and password', 400))
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return next(new CustomError('User already exists with this email', 400))
    }

    // Create user — password gets hashed automatically (pre-save hook!)
    const user = await User.create({ name, email, password })

    // Generate JWT token
    const token = generateToken(user._id)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    next(error)
  }
}

// ─────────────────────────────────────
// POST /api/auth/login
// ─────────────────────────────────────
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return next(new CustomError('Please provide email and password', 400))
    }

    // Find user AND include password 
    // (remember we set select: false in schema!)
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return next(new CustomError('Invalid email or password', 401))
    }

    // Compare entered password with hashed password
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return next(new CustomError('Invalid email or password', 401))
    }

    // Generate JWT token
    const token = generateToken(user._id)

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })

  } catch (error) {
    next(error)
  }
}

// ─────────────────────────────────────
// GET /api/auth/me (get logged in user info)
// ─────────────────────────────────────
const getMe = async (req, res, next) => {
  try {
    // req.user is set by our auth middleware (next step!)
    const user = await User.findById(req.user.id)

    res.status(200).json({
      success: true,
      user
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
  login,
  getMe
}