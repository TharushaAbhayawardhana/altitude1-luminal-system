import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader2, CreditCard, UserPlus } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { registerUser } from '../services/firebase'
import { initiatePayHerePayment, generateOrderId } from '../services/payhere'
import { createOrder, completeOrder, sendWelcomeEmail } from '../services/api'

export default function CheckoutForm() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { addToast } = useToast()

  const INITIAL_FORM = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    password: '',
    confirmPassword: '',
  }

  const [submitting, setSubmitting] = useState(false)
  const [createAccount, setCreateAccount] = useState(false)
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})

  const plan = state?.plan
  const isYearly = state?.isYearly

  if (!plan) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary">No plan selected. Please choose a plan from the pricing page.</p>
      </div>
    )
  }

  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice

  function validate() {
    const errs = {}
    if (!form.firstName.trim()) errs.firstName = 'Required'
    if (!form.lastName.trim()) errs.lastName = 'Required'
    if (!form.email.trim()) errs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.phone.trim()) errs.phone = 'Required'
    if (!form.address.trim()) errs.address = 'Required'
    if (!form.city.trim()) errs.city = 'Required'
    if (createAccount) {
      if (!form.password) errs.password = 'Required'
      else if (form.password.length < 6) errs.password = 'At least 6 characters'
      if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match'
    }
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return

    setSubmitting(true)
    const orderId = generateOrderId()

    try {
      if (createAccount) {
        await registerUser(form.email, form.password)
        addToast('Account created successfully!', 'success')
        try {
          await sendWelcomeEmail(form.email, `${form.firstName} ${form.lastName}`)
        } catch {
          console.warn('Welcome email skipped (mail server may be offline)')
        }
      }

      await createOrder({
        orderId,
        planId: plan.id,
        planName: plan.name,
        amount: price,
        currency: isYearly ? 'yearly' : 'monthly',
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        createAccount,
      })

      const result = await initiatePayHerePayment({
        orderId,
        amount: price,
        currency: 'LKR',
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        planName: plan.name,
      })

      if (result.status === 'sdk_unavailable') {
        addToast('Payment gateway unavailable. Please try again or contact support.', 'error')
        setSubmitting(false)
        return
      }

      if (result.status === 'cancelled') {
        addToast('Payment was cancelled.', 'warning')
        setSubmitting(false)
        return
      }

      if (result.status === 'error') {
        addToast('Payment failed. Please try again.', 'error')
        setSubmitting(false)
        return
      }

      if (result.status === 'completed') {
        setForm(INITIAL_FORM)
        setCreateAccount(false)

        try {
          await completeOrder(orderId)
        } catch (err) {
          console.warn('Order completion notification skipped:', err)
        }

        navigate('/success', {
          state: {
            orderId,
            plan,
            isYearly,
            accountCreated: createAccount,
            amount: price,
          },
        })
        return
      }

    } catch (err) {
      console.error('Checkout error:', err)
      addToast(err.message || 'Payment failed. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const fields = [
    { name: 'firstName', label: 'First Name', half: true },
    { name: 'lastName', label: 'Last Name', half: true },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'address', label: 'Address' },
    { name: 'city', label: 'City' },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="glass rounded-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-accent" />
          Billing Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(({ name, label, half, type }) => (
            <div key={name} className={half ? '' : 'sm:col-span-2'}>
              <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type || 'text'}
                value={form[name]}
                onChange={handleChange}
                className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors[name] ? 'border-error' : 'border-border'
                }`}
                placeholder={label}
              />
              {errors[name] && <p className="text-xs text-error mt-1">{errors[name]}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 sm:p-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={createAccount}
            onChange={() => setCreateAccount(!createAccount)}
            className="h-5 w-5 rounded-lg border-border bg-white/5 text-primary focus:ring-primary/50"
          />
          <div>
            <span className="text-sm font-medium text-white flex items-center gap-2">
              <UserPlus className="h-4 w-4 text-accent" />
              Create account for future access
            </span>
            <p className="text-xs text-text-secondary">Save your order history and access exclusive features.</p>
          </div>
        </label>

        {createAccount && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors.password ? 'border-error' : 'border-border'
                }`}
                placeholder="Min 6 characters"
              />
              {errors.password && <p className="text-xs text-error mt-1">{errors.password}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors.confirmPassword ? 'border-error' : 'border-border'
                }`}
                placeholder="Repeat password"
              />
              {errors.confirmPassword && <p className="text-xs text-error mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>
        )}
      </div>

      <div className="glass rounded-2xl p-6 sm:p-8">
        <h3 className="text-sm font-semibold text-text-secondary mb-3">Order Summary</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">{plan.name} Plan</span>
          <span className="text-white font-bold">${price}/{isYearly ? 'yr' : 'mo'}</span>
        </div>
        <p className="text-text-secondary text-xs">{plan.description}</p>
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-white font-semibold">Total</span>
          <span className="text-xl font-bold gradient-text">${price}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full gradient-bg text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 glow-accent"
      >
        {submitting ? (
          <><Loader2 className="h-5 w-5 animate-spin" /> Processing...</>
        ) : (
          <><CreditCard className="h-5 w-5" /> Pay ${price} — {plan.name}
          </>
        )}
      </button>
    </form>
  )
}
