import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true, glow = false }) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass rounded-2xl p-6 transition-all duration-300 ${
        glow ? 'glow' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}
