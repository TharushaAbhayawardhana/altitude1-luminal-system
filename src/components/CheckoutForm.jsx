import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Loader2, CreditCard, UserPlus, LogIn } from 'lucide-react'
import { useToast } from '../hooks/useToast'
import { registerUser, signInWithGoogle } from '../services/firebase'
import { initiatePayHerePayment, generateOrderId } from '../services/payhere'
import { createOrder, completeOrder, sendWelcomeEmail, createUser, getUserByFirebaseUid } from '../services/api'

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
  const [user, setUser] = useState(null)
  const [googleLoading, setGoogleLoading] = useState(false)

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

  async function handleGoogleSignIn() {
    setGoogleLoading(true)
    try {
      const firebaseUser = await signInWithGoogle()
      const lookup = await getUserByFirebaseUid(firebaseUser.uid)
      let userId

      if (lookup.user) {
        userId = lookup.user.id
      } else {
        const nameParts = (firebaseUser.displayName || '').split(' ')
        const result = await createUser({
          firebaseUid: firebaseUser.uid,
          email: firebaseUser.email,
          firstName: nameParts[0] || '',
          lastName: nameParts.slice(1).join(' ') || '',
          phone: '',
        })
        userId = result.user_id
      }

      setUser({
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        firstName: (firebaseUser.displayName || '').split(' ')[0] || '',
        lastName: (firebaseUser.displayName || '').split(' ').slice(1).join(' ') || '',
        userId,
      })

      setForm(prev => ({
        ...prev,
        email: firebaseUser.email,
        firstName: (firebaseUser.displayName || '').split(' ')[0] || '',
        lastName: (firebaseUser.displayName || '').split(' ').slice(1).join(' ') || '',
      }))

      addToast('Signed in with Google!', 'success')
    } catch (err) {
      console.error('Google sign-in error:', err)
      addToast('Google sign-in failed. Please try again.', 'error')
    } finally {
      setGoogleLoading(false)
    }
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
        const firebaseUser = await registerUser(form.email, form.password)
        addToast('Account created successfully!', 'success')

        try {
          const userResult = await createUser({
            firebaseUid: firebaseUser.uid,
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            phone: form.phone,
          })
          setUser({
            firebaseUid: firebaseUser.uid,
            email: form.email,
            firstName: form.firstName,
            lastName: form.lastName,
            userId: userResult.user_id,
          })
        } catch (err) {
          console.warn('Failed to save user to database:', err)
        }

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
        userId: user?.userId || null,
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
        setUser(null)

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
      <div className="glass rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg gradient-bg flex items-center justify-center">
            <CreditCard className="h-4 w-4 text-white" />
          </div>
          Billing Details
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {fields.map(({ name, label, half, type }) => (
            <div key={name} className={half ? '' : 'sm:col-span-2'}>
              <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1.5">
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type || 'text'}
                value={form[name]}
                onChange={handleChange}
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                  errors[name] ? 'border-error' : 'border-border'
                }`}
                placeholder={label}
              />
              {errors[name] && <p className="text-xs text-error mt-1.5">{errors[name]}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <LogIn className="h-5 w-5 text-accent" />
          <span className="text-sm font-medium text-white">Quick Sign In</span>
        </div>
        {user ? (
          <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full gradient-bg flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </span>
              </div>
              <div>
                <p className="text-sm text-white font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-text-secondary">{user.email}</p>
              </div>
            </div>
            <span className="text-xs text-success font-medium flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success" /> Signed in
            </span>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-border hover:border-white/15 rounded-xl px-4 py-3.5 text-sm text-white font-medium transition-all duration-300 disabled:opacity-50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          >
            {googleLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            {googleLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>
        )}
      </div>

      <div className="glass rounded-2xl p-6 md:p-8">
        {user ? (
          <div className="flex items-center gap-3">
            <UserPlus className="h-4 w-4 text-success" />
            <div>
              <span className="text-sm font-medium text-white">Account connected</span>
              <p className="text-xs text-text-secondary">Your order will be linked to your Google account.</p>
            </div>
          </div>
        ) : (
          <>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 pt-5 border-t border-border">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.password ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Min 6 characters"
                  />
                  {errors.password && <p className="text-xs text-error mt-1.5">{errors.password}</p>}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary mb-1.5">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                      errors.confirmPassword ? 'border-error' : 'border-border'
                    }`}
                    placeholder="Repeat password"
                  />
                  {errors.confirmPassword && <p className="text-xs text-error mt-1.5">{errors.confirmPassword}</p>}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="glass rounded-2xl p-6 md:p-8">
        <h3 className="text-sm font-semibold text-text-secondary mb-5">Order Summary</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-medium">{plan.name} Plan</span>
          <span className="text-white font-bold">${price}/{isYearly ? 'yr' : 'mo'}</span>
        </div>
        <p className="text-text-secondary text-sm">{plan.description}</p>
        <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
          <span className="text-white font-semibold">Total</span>
          <span className="text-2xl font-bold gradient-text">${price}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full gradient-bg text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 glow-accent hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
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
