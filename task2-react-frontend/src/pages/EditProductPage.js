import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, updateProduct } from '../services/productService'

function EditProductPage() {

  // Get :id from URL
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    description: ''
  })

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Fetch existing product data when page loads
  useEffect(() => {
    fetchProduct()
  }, [])

  const fetchProduct = async () => {
    try {
      const response = await getProductById(id)
      setFormData(response.data) // pre-fill form with existing data
    } catch (err) {
      setError('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setSubmitting(true)
      await updateProduct(id, formData)
      navigate('/') // redirect after success
    } catch (err) {
      setError('Failed to update product')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <h2 style={{ padding: '30px' }}>Loading product...</h2>
  }

  return (
    <div style={{ padding: '30px', maxWidth: '500px' }}>
      <h2>Edit Product</h2>

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
          {submitting ? 'Updating...' : 'Update Product'}
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

export default EditProductPage