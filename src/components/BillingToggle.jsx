import { motion } from 'framer-motion'

export default function BillingToggle({ isYearly, onToggle }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={`text-sm font-medium transition-colors duration-300 ${!isYearly ? 'text-white' : 'text-text-secondary'}`}>
        Monthly
      </span>
      <button
        onClick={onToggle}
        className={`relative h-8 w-16 rounded-full transition-colors duration-300 ${
          isYearly ? 'bg-primary' : 'bg-white/10'
        }`}
      >
        <motion.div
          animate={{ x: isYearly ? 32 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="h-6 w-6 rounded-full bg-white shadow-lg absolute top-1"
        />
      </button>
      <span className={`text-sm font-medium transition-colors duration-300 ${isYearly ? 'text-white' : 'text-text-secondary'}`}>
        Yearly
      </span>
      {isYearly && (
        <span className="text-xs text-success font-semibold bg-success/10 px-2.5 py-1 rounded-full">
          Save 20%
        </span>
      )}
    </div>
  )
}
