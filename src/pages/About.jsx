import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ValueCard from '../components/ValueCard'
import TeamCard from '../components/TeamCard'
import { coreValues, teamMembers } from '../utils/teamData'

export default function About() {
  return (
    <PageTransition>
      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              About <span className="gradient-text">Luminal Systems</span>
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              We are on a mission to democratize enterprise-grade technology for businesses of all sizes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Founded in 2020, Luminal Systems emerged from a simple observation: businesses 
                deserved better technology solutions. Our founders, veterans of the enterprise 
                software industry, saw firsthand how outdated systems were holding companies back.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                What started as a small team of engineers has grown into a global company 
                serving thousands of customers across 50+ countries. We remain committed to 
                our original vision: making powerful technology accessible to everyone.
              </p>
              <p className="text-text-secondary leading-relaxed">
                Today, Luminal Systems powers mission-critical operations for startups to 
                Fortune 500 companies, delivering the performance, security, and reliability 
                that modern business demands.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 h-80 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-6xl font-bold gradient-text">2020</div>
                <p className="text-text-secondary text-sm mt-2">Founded with a vision</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-text-secondary">The principles that guide everything we do.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, i) => (
              <ValueCard key={value.title} value={value} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Meet the Team</h2>
            <p className="text-text-secondary">The people building the future of enterprise technology.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {teamMembers.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Want to join us?</h2>
            <p className="text-text-secondary mb-8">We are always looking for talented people.</p>
            <Link
              to="/contact"
              className="inline-flex gradient-bg text-white px-8 py-3.5 rounded-xl font-semibold text-sm gap-2 glow hover:opacity-90 transition-opacity"
            >
              Get in Touch <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
