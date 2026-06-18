import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../services/productService'

function AddProductPage() {

  // useNavigate lets us redirect after submit
  const navigate = useNavigate()

  // One state object for all form fields
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: ''
  })

  // Track if submitting (disable button while saving)
  const [submitting, setSubmitting] = useState(false)

  // Track errors
  const [error, setError] = useState(null)

  // Runs on every input change
  const handleChange = (e) => {
    setFormData({
      ...formData,                    // keep other fields same
      [e.target.name]: e.target.value // update only this field
    })
  }

  // Runs when form is submitted
  const handleSubmit = async (e) => {
    e.preventDefault() // stops page from refreshing

    try {
      setSubmitting(true)
      setError(null)

      // Call our service function
      await createProduct(formData)

      // Redirect to home page after success
      navigate('/')

    } catch (err) {
      setError('Failed to create product. Please check all fields.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div style={{ padding: '30px', maxWidth: '500px' }}>
      <h2>Add New Product</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>

        <div style={styles.field}>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={styles.button}
        >
          {submitting ? 'Saving...' : 'Add Product'}
        </button>

      </form>
    </div>
  )
}

const styles = {
  field: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '16px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  }
}

export default AddProductPage