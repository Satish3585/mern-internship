import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={styles.nav}>

      {/* App title — clicking goes home */}
      <Link to="/" style={styles.brand}>
        🛍️ Products App
      </Link>

      {/* Navigation links */}
      <div>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/add" style={styles.link}>
          Add Product
        </Link>
      </div>

    </nav>
  )
}

// Simple styles
const styles = {
  nav: {
    backgroundColor: '#2c3e50',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  brand: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginLeft: '20px',
    fontSize: '16px'
  }
}

export default Navbar