import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

export async function submitContact(data) {
  const response = await api.post('/contact.php', data)
  return response.data
}

export async function createOrder(data) {
  const response = await api.post('/orders.php', data)
  return response.data
}

export async function getOrder(orderId) {
  const response = await api.get('/orders.php', { params: { order_id: orderId } })
  return response.data
}

export async function completeOrder(orderId) {
  const response = await api.post('/complete-order.php', { order_id: orderId })
  return response.data
}

export async function sendWelcomeEmail(email, name) {
  const response = await api.post('/send-welcome.php', { email, name })
  return response.data
}

export async function createUser(data) {
  const response = await api.post('/users.php', data)
  return response.data
}

export async function getUserByFirebaseUid(firebaseUid) {
  const response = await api.get('/users.php', { params: { firebase_uid: firebaseUid } })
  return response.data
}

export async function getPayHereHash(orderId, amount, currency) {
  const response = await api.post('/payhere-hash.php', { order_id: orderId, amount, currency })
  return response.data
}

export default api
