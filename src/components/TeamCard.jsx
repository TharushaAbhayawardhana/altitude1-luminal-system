import { motion } from 'framer-motion'

export default function TeamCard({ member, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="glass rounded-2xl p-6 text-center hover:border-border-hover transition-all duration-300 group"
    >
      <div className="h-20 w-20 rounded-full gradient-bg mx-auto mb-4 flex items-center justify-center overflow-hidden">
        <div className="h-18 w-18 rounded-full bg-gray-800 flex items-center justify-center text-2xl font-bold text-white">
          {member.name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      <h3 className="text-white font-semibold">{member.name}</h3>
      <p className="text-accent text-xs font-medium mt-1">{member.role}</p>
      <p className="text-text-secondary text-xs mt-2">{member.bio}</p>
    </motion.div>
  )
}
