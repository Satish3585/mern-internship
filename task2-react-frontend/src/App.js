import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import AddProductPage from './pages/AddProductPage'
import EditProductPage from './pages/EditProductPage'
import './App.css'

function App() {
  return (
    // BrowserRouter → enables routing in our app
    <BrowserRouter>

      {/* Navbar shows on every page */}
      <Navbar />

      {/* Routes → defines which component shows at which URL */}
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/add"     element={<AddProductPage />} />
        <Route path="/edit/:id" element={<EditProductPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App