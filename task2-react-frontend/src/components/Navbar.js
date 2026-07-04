import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {

  const { isLoggedIn, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>
        🛍️ Products App
      </Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>

        {isLoggedIn ? (
          <>
            <Link to="/add" style={styles.link}>Add Product</Link>
            <span style={styles.username}>👤 {user?.name}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={styles.loginBtn}>
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

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
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px'
  },
  username: {
    color: '#2ecc71',
    fontSize: '14px'
  },
  loginBtn: {
    color: 'white',
    textDecoration: 'none',
    backgroundColor: '#3498db',
    padding: '8px 15px',
    borderRadius: '6px'
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px'
  }
}

export default Navbar