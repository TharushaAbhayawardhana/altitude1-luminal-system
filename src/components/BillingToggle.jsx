import { motion } from 'framer-motion'

export default function BillingToggle({ isYearly, onToggle }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-10">
      <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-text-secondary'}`}>
        Monthly
      </span>
      <button
        onClick={onToggle}
        className={`relative h-7 w-14 rounded-full transition-colors duration-300 ${
          isYearly ? 'bg-primary' : 'bg-gray-700'
        }`}
      >
        <motion.div
          animate={{ x: isYearly ? 28 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="h-5 w-5 rounded-full bg-white absolute top-1"
        />
      </button>
      <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-text-secondary'}`}>
        Yearly
      </span>
      {isYearly && (
        <span className="text-xs text-success font-semibold bg-success/10 px-2 py-0.5 rounded-full">
          Save 20%
        </span>
      )}
    </div>
  )
}
