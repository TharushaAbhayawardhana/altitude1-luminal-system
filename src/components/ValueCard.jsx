import { motion } from 'framer-motion'
import { Lightbulb, Shield, Eye, Star } from 'lucide-react'

const iconMap = {
  lightbulb: Lightbulb,
  shield: Shield,
  eye: Eye,
  star: Star,
}

export default function ValueCard({ value, index }) {
  const Icon = iconMap[value.icon] || Lightbulb

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="glass rounded-2xl p-6 text-center hover:border-border-hover transition-all duration-300"
    >
      <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-white font-semibold mb-2">{value.title}</h3>
      <p className="text-text-secondary text-sm">{value.description}</p>
    </motion.div>
  )
}
