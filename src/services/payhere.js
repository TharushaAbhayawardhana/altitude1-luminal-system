import { getPayHereHash } from './api'

const PAYHERE_MERCHANT_ID = import.meta.env.VITE_PAYHERE_MERCHANT_ID || '1236021'
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'

const PAYHERE_URLS = [
  'https://www.payhere.lk/lib/payhere.js',
]

export function generateOrderId() {
  return 'LS-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase()
}

function loadPayHereSDK() {
  return new Promise((resolve, reject) => {
    if (window.payhere) {
      return resolve()
    }

    const url = 'https://www.payhere.lk/lib/payhere.js'
    const script = document.createElement('script')
    script.src = url
    script.async = false

    script.onload = () => {
      let waited = 0
      const poll = setInterval(() => {
        waited += 100
        if (window.payhere) {
          clearInterval(poll)
          resolve()
        } else if (waited >= 5000) {
          clearInterval(poll)
          reject(new Error('PayHere SDK not available after loading'))
        }
      }, 100)
    }

    script.onerror = () => {
      reject(new Error('Failed to load PayHere SDK'))
    }

    document.head.appendChild(script)
  })
}

export async function initiatePayHerePayment({ orderId, amount, currency, firstName, lastName, email, phone, address, city, planName }) {
  try {
    await loadPayHereSDK()
  } catch (err) {
    console.error('PayHere SDK could not be loaded:', err.message)
    return { status: 'sdk_unavailable', orderId, error: err.message }
  }

  let hashData
  try {
    hashData = await getPayHereHash(orderId, amount, currency || 'LKR')
  } catch (err) {
    console.error('Failed to generate PayHere hash:', err.message)
    return { status: 'error', orderId, error: 'Failed to generate payment hash' }
  }

  return new Promise((resolve) => {
    payhere.onCompleted = function onComplete() {
      console.log('PayHere payment completed for order:', orderId)
      fetch(`${API_BASE}/complete-order.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: orderId }),
        keepalive: true,
      }).catch(() => {})
      resolve({ status: 'completed', orderId })
    }

    payhere.onDismissed = function onDismissed() {
      console.log('PayHere payment dismissed for order:', orderId)
      resolve({ status: 'cancelled', orderId })
    }

    payhere.onError = function onError(error) {
      console.error('PayHere error:', error)
      resolve({ status: 'error', orderId, error })
    }

    const payment = {
      sandbox: true,
      merchant_id: hashData.merchant_id,
      return_url: `${window.location.origin}/success?order_id=${orderId}`,
      cancel_url: `${window.location.origin}/checkout`,
      notify_url: `${import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'}/payhere-notify.php`,
      order_id: orderId,
      items: planName,
      amount,
      currency: currency || 'LKR',
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      address,
      city,
      country: 'Sri Lanka',
      hash: hashData.hash,
    }

    payhere.startPayment(payment)
  })
}
