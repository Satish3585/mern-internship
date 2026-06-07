const errorHandler = (err, req, res, next) => {

  // Log error in terminal (for developer to see)
  console.error(`❌ Error: ${err.message}`)

  // Default error values
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // Handle specific MongoDB/Mongoose errors

  // Error 1 — Invalid MongoDB ID
  // Example: /products/invalidid123
  if (err.name === 'CastError') {
    statusCode = 404
    message = `Resource not found with id: ${err.value}`
  }

  // Error 2 — Duplicate field value
  // Example: Adding product with same name twice
  if (err.code === 11000) {
    statusCode = 400
    const field = Object.keys(err.keyValue)[0]
    message = `Duplicate value for field: ${field}`
  }

  // Error 3 — Mongoose Validation Error
  // Example: Missing required field
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ')
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: message
  })
}

module.exports = errorHandler