import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true, glow = false }) {
  return (
    <motion.div
      whileHover={hover ? { y: -6, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`glass rounded-2xl p-6 md:p-8 transition-all duration-300 ${
        glow ? 'glow' : 'shadow-[0_4px_24px_rgba(0,0,0,0.2)]'
      } hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] hover:border-white/15 ${className}`}
    >
      {children}
    </motion.div>
  )
}
