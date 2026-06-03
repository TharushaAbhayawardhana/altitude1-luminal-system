import { motion } from 'framer-motion'

export default function TeamCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass rounded-2xl p-6 text-center hover:border-white/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-500 group"
    >
      <div className="h-20 w-20 rounded-full gradient-bg mx-auto mb-4 flex items-center justify-center p-0.5">
        <div className="h-full w-full rounded-full bg-gray-900 flex items-center justify-center text-xl font-bold text-white">
          {member.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      <h3 className="text-white font-semibold group-hover:text-primary-light transition-colors">{member.name}</h3>
      <p className="text-accent text-xs font-medium mt-1">{member.role}</p>
      <p className="text-text-secondary text-xs mt-2 leading-relaxed">{member.bio}</p>
    </motion.div>
  )
}
