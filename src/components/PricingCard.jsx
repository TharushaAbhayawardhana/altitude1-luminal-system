import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

export default function PricingCard({ plan, isYearly, index }) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`relative rounded-2xl p-8 md:p-10 transition-all duration-500 ${
        plan.popular
          ? 'glass-strong glow border-primary/30 scale-105 md:scale-110'
          : 'glass hover:border-white/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 gradient-bg px-5 py-1.5 rounded-full text-xs font-semibold text-white shadow-lg">
          Best Value
        </div>
      )}
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-text-secondary text-sm mb-6">{plan.description}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-5xl font-bold text-white tracking-tight">${price}</span>
          <span className="text-text-secondary text-sm">/{isYearly ? 'yr' : 'mo'}</span>
        </div>
      </div>
      <ul className="space-y-3.5 mb-10">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
            <div className="h-5 w-5 rounded-full bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="h-3 w-3 text-success" />
            </div>
            {feature}
          </li>
        ))}
      </ul>
      <Link
        to="/checkout"
        state={{ plan, isYearly }}
        className={`block text-center py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
          plan.popular
            ? 'gradient-bg text-white glow hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-[1.02]'
            : 'glass text-white hover:bg-white/10 hover:border-white/15'
        }`}
      >
        Get Started
      </Link>
    </motion.div>
  )
}
