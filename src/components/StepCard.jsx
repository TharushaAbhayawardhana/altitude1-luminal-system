import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function StepCard({ step, title, description, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="relative flex gap-6"
    >
      <div className="flex flex-col items-center">
        <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center shrink-0">
          <CheckCircle className="h-5 w-5 text-white" />
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-gradient-to-b from-primary to-accent mt-2" />}
      </div>
      <div className="pb-8">
        <h3 className="text-lg font-bold text-white mb-1">
          Step {step}: {title}
        </h3>
        <p className="text-text-secondary text-sm">{description}</p>
      </div>
    </motion.div>
  )
}
