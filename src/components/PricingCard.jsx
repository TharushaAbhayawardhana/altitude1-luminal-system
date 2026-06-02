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
      className={`relative rounded-2xl p-8 transition-all duration-300 ${
        plan.popular
          ? 'glass glow border-accent/30 scale-105 md:scale-110'
          : 'glass hover:border-border-hover'
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-bg px-4 py-1 rounded-full text-xs font-semibold text-white">
          Best Value
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-text-secondary text-sm mb-4">{plan.description}</p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-white">${price}</span>
          <span className="text-text-secondary text-sm">/{isYearly ? 'yr' : 'mo'}</span>
        </div>
      </div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
            <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <Link
        to="/checkout"
        state={{ plan, isYearly }}
        className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
          plan.popular
            ? 'gradient-bg text-white glow-accent hover:opacity-90'
            : 'glass text-white hover:bg-surface-hover'
        }`}
      >
        Buy Now
      </Link>
    </motion.div>
  )
}
