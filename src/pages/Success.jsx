import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useSearchParams, Navigate, Link } from 'react-router-dom'
import { CheckCircle, ArrowRight, Sparkles, UserPlus, Loader2 } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import GlassCard from '../components/GlassCard'
import { getOrder } from '../services/api'

export default function Success() {
  const { state } = useLocation()
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [orderData, setOrderData] = useState(null)

  const orderIdFromUrl = searchParams.get('order_id')
  const hasState = state?.orderId

  useEffect(() => {
    if (hasState) {
      setOrderData(state)
      setLoading(false)
      return
    }

    if (orderIdFromUrl) {
      getOrder(orderIdFromUrl)
        .then((data) => {
          if (data.success && data.order) {
            setOrderData({
              orderId: data.order.order_id,
              plan: { name: data.order.plan_name },
              isYearly: data.order.currency === 'yearly',
              amount: data.order.amount,
              accountCreated: false,
            })
          }
          setLoading(false)
        })
        .catch(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  }, [hasState, orderIdFromUrl])

  if (!loading && !orderData && !orderIdFromUrl) {
    return <Navigate to="/pricing" replace />
  }

  if (loading) {
    return (
      <PageTransition>
        <section className="pt-28 pb-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
            <p className="text-text-secondary mt-4">Loading order details...</p>
          </div>
        </section>
      </PageTransition>
    )
  }

  if (!orderData) {
    return (
      <PageTransition>
        <section className="pt-28 pb-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
            <p className="text-text-secondary mb-8">We could not find your order details.</p>
            <Link
              to="/contact"
              className="inline-flex gradient-bg text-white px-8 py-3.5 rounded-xl font-semibold text-sm glow hover:opacity-90 transition-opacity"
            >
              Contact Support
            </Link>
          </div>
        </section>
      </PageTransition>
    )
  }

  const { orderId, plan, isYearly, accountCreated, amount } = orderData

  return (
    <PageTransition>
      <section className="pt-28 pb-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="h-20 w-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-success" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Payment Successful!</h1>
            <p className="text-text-secondary mb-8">Thank you for choosing Luminal Systems.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 text-left"
          >
            <GlassCard>
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                <span className="text-text-secondary text-sm">Order ID</span>
                <span className="text-white font-mono text-sm font-semibold">{orderId}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-text-secondary text-sm">Plan</span>
                <span className="text-white font-semibold">{plan.name}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-text-secondary text-sm">Billing</span>
                <span className="text-white font-semibold">{isYearly ? 'Yearly' : 'Monthly'}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-white font-semibold">Amount Paid</span>
                <span className="text-2xl font-bold gradient-text">${amount}</span>
              </div>
            </GlassCard>

            {accountCreated && (
              <GlassCard className="flex items-center gap-3 !p-4">
                <UserPlus className="h-5 w-5 text-success shrink-0" />
                <p className="text-sm text-text-secondary">
                  Your account has been created. Check your email for login credentials.
                </p>
              </GlassCard>
            )}

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="gradient-bg text-white px-8 py-3.5 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 glow hover:opacity-90 transition-opacity"
              >
                <Sparkles className="h-4 w-4" /> Go to Home
              </Link>
              <Link
                to="/contact"
                className="glass text-white px-8 py-3.5 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-surface-hover transition-all"
              >
                Need Help? <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
