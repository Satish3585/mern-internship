import { Link } from 'react-router-dom'

function ProductCard({ product, onDelete }) {
  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <p>Stock: {product.stock}</p>
      {product.description && <p>{product.description}</p>}

      <div style={styles.buttons}>
        {/* Link to edit page with product id */}
        <Link to={`/edit/${product._id}`} style={styles.editBtn}>
          Edit
        </Link>

        {/* Delete button calls function passed from parent */}
        <button
          onClick={() => onDelete(product._id)}
          style={styles.deleteBtn}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    width: '250px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  buttons: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  editBtn: {
    padding: '8px 15px',
    backgroundColor: '#3498db',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '14px'
  },
  deleteBtn: {
    padding: '8px 15px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    cursor: 'pointer'
  }
}

export default ProductCard