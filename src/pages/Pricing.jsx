import { useState } from 'react'
import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import PricingCard from '../components/PricingCard'
import BillingToggle from '../components/BillingToggle'
import { pricingPlans } from '../utils/pricingData'

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <PageTransition>
      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Simple <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-text-secondary max-w-xl mx-auto">
              Choose the plan that fits your needs. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BillingToggle isYearly={isYearly} onToggle={() => setIsYearly(!isYearly)} />
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {pricingPlans.map((plan, i) => (
              <PricingCard key={plan.id} plan={plan} isYearly={isYearly} index={i} />
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
