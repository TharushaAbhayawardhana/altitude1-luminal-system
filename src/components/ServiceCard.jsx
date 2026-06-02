import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function ServiceCard({ service, index }) {
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass rounded-2xl p-6 hover:border-border-hover transition-all duration-300 group"
    >
      <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
      <p className="text-text-secondary text-sm mb-4">{service.description}</p>
      <ul className="space-y-2">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-xs text-text-secondary">
            <Check className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <button className="mt-4 text-sm font-semibold text-accent hover:text-accent-dark transition-colors">
        Learn More &rarr;
      </button>
    </motion.div>
  )
}
