const express = require('express')
const router = express.Router()

const { signup, login, getMe } = require('../controllers/authController')
const { protect } = require('../middleware/authMiddleware')  // we build this next!

router.post('/signup', signup)
router.post('/login', login)
router.get('/me', protect, getMe)   // protected route example

module.exports = router