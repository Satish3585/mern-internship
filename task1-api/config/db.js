const mongoose = require('mongoose')

const connectDB = async () => {
  try {

    // Connect using URL from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI)

    // Success message
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)

  } catch (error) {

    // If connection fails show error
    console.log(`❌ MongoDB Error: ${error.message}`)

    // Stop the app if DB not connected
    process.exit(1)
  }
}

module.exports = connectDB