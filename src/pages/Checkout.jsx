import { motion } from 'framer-motion'
import { useLocation, Navigate, Link } from 'react-router-dom'
import { ArrowLeft, CreditCard, Sparkles } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import CheckoutForm from '../components/CheckoutForm'

export default function Checkout() {
  const { state } = useLocation()

  if (!state?.plan) {
    return <Navigate to="/pricing" replace />
  }

  const plan = state.plan
  const isYearly = state.isYearly

  return (
    <PageTransition>
      <section className="pt-28 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Pricing
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-accent" />
              Checkout
            </h1>
            <p className="text-text-secondary">Complete your purchase of the {plan.name} plan.</p>
          </motion.div>

          <div className="max-w-2xl">
            <CheckoutForm />
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
