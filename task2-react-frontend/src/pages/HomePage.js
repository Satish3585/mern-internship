import { useState, useEffect } from 'react'
import { getAllProducts, deleteProduct } from '../services/productService'
import ProductCard from '../components/ProductCard'
import { useAuth } from '../context/AuthContext'    // ← NEW

function HomePage() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { isLoggedIn } = useAuth()                 // ← NEW

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await getAllProducts()
      setProducts(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch products. Is your server running?')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')
    if (!confirmDelete) return
    try {
      await deleteProduct(id)
      setProducts(products.filter((product) => product._id !== id))
    } catch (err) {
      alert('Failed to delete product')
    }
  }

  if (loading) {
    return <h2 style={{ padding: '30px' }}>Loading products...</h2>
  }

  if (error) {
    return <h2 style={{ padding: '30px', color: 'red' }}>{error}</h2>
  }

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f6fa', minHeight: '100vh' }}>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>All Products</h2>

      {products.length === 0 && <p>No products found!</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
            isLoggedIn={isLoggedIn}    // ← NEW
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage