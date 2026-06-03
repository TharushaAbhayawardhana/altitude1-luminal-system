import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

export default function ServiceCard({ service, index }) {
  const Icon = service.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group glass rounded-2xl p-6 md:p-8 hover:border-white/15 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
    >
      <div className="h-14 w-14 rounded-xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-5">{service.description}</p>
      <ul className="space-y-2.5 mb-6">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-text-secondary">
            <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:text-accent-light transition-colors">
        Learn More <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
      </span>
    </motion.div>
  )
}
