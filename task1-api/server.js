const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/errorHandler')
const morgan = require('morgan')            // ← ADD THIS

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))                      // ← ADD THIS

// Routes
const productRoutes = require('./routes/productRoutes')
app.use('/products', productRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Products API is running! 🚀' })
})

app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.originalUrl} not found`
  })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})