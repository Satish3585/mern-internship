import { useState, useEffect } from 'react'
import { getAllProducts, deleteProduct } from '../services/productService'
import ProductCard from '../components/ProductCard'

function HomePage() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  // Handle delete click
  const handleDelete = async (id) => {
    // Ask for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this product?')

    if (!confirmDelete) return

    try {
      await deleteProduct(id)
      // Remove deleted product from state (no need to refetch!)
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
    <div style={{ padding: '30px' }}>
      <h2>All Products</h2>

      {products.length === 0 && <p>No products found!</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default HomePage