import { createContext, useState, useContext } from 'react'

// Create the context
const AuthContext = createContext()

// Provider component — wraps entire app
export const AuthProvider = ({ children }) => {

  // Check if token already exists in localStorage
  const [token, setToken] = useState(
    localStorage.getItem('token') || null
  )

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  // Login function — saves token and user
  const login = (tokenData, userData) => {
    localStorage.setItem('token', tokenData)
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(tokenData)
    setUser(userData)
  }

  // Logout function — removes token and user
  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  // Is user logged in?
  const isLoggedIn = !!token

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — easy way to use auth anywhere
export const useAuth = () => useContext(AuthContext)