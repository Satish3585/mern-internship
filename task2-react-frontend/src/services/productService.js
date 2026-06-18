import axios from 'axios'

// Base URL of our Task 1 API
const API_URL = 'http://localhost:5000/products'

// Get all products
export const getAllProducts = async () => {
  const response = await axios.get(API_URL)
  return response.data
}

// Get single product
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

// Create new product
export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData)
  return response.data
}

// Update product
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData)
  return response.data
}

// Delete product
export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}