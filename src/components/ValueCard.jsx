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
      className="glass rounded-2xl p-6 md:p-8 text-center hover:border-white/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-500 group"
    >
      <div className="h-14 w-14 rounded-xl gradient-bg/20 bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="h-7 w-7 text-primary" />
      </div>
      <h3 className="text-white font-semibold mb-2">{value.title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed">{value.description}</p>
    </motion.div>
  )
}
