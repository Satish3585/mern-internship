import axios from 'axios'

const API_URL = 'http://localhost:5000/products'

// Helper — gets token from localStorage and
// creates Authorization header automatically
const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
}

// PUBLIC — no token needed
export const getAllProducts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

// PROTECTED — sends token automatically
export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData, getAuthHeader())
  return response.data
}

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData, getAuthHeader())
  return response.data
}

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeader())
  return response.data
}