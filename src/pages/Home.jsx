import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Shield, Zap, Users, Sparkles } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import GlassCard from '../components/GlassCard'

const features = [
  { icon: TrendingUp, title: 'Scalable Growth', desc: 'Infrastructure that grows with your business, from startup to enterprise.' },
  { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption and compliance with global security standards.' },
  { icon: Zap, title: 'Blazing Performance', desc: 'Lightning-fast load times with 99.99% uptime guarantee.' },
  { icon: Users, title: 'Team Collaboration', desc: 'Built for teams with real-time collaboration and role-based access.' },
]

const stats = [
  { label: 'Active Users', value: '10K+' },
  { label: 'Uptime', value: '99.99%' },
  { label: 'Countries', value: '50+' },
  { label: 'Data Processed', value: '2PB+' },
]

export default function Home() {
  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 text-xs text-text-secondary">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              Now available in early access
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Intelligence that
              <span className="gradient-text block">powers your business</span>
            </h1>
            <p className="text-lg text-text-secondary mb-8 max-w-xl mx-auto">
              Luminal Systems delivers enterprise-grade SaaS solutions with cutting-edge AI, 
              robust security, and scalable infrastructure — designed for the modern enterprise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/pricing"
                className="gradient-bg text-white px-8 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 glow hover:opacity-90 transition-opacity"
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/how-it-works"
                className="glass text-white px-8 py-3.5 rounded-xl font-semibold text-sm hover:bg-surface-hover transition-all"
              >
                How It Works
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center glass rounded-xl p-4">
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to scale
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto">
              Powerful features packed into a seamless platform.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <GlassCard key={feature.title} index={index}>
                  <div className="h-10 w-10 rounded-lg gradient-bg flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm">{feature.desc}</p>
                </GlassCard>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.1),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to transform your workflow?
            </h2>
            <p className="text-text-secondary max-w-md mx-auto mb-8">
              Join thousands of teams already using Luminal Systems.
            </p>
            <Link
              to="/pricing"
              className="inline-flex gradient-bg text-white px-8 py-3.5 rounded-xl font-semibold text-sm gap-2 glow hover:opacity-90 transition-opacity"
            >
              See Plans & Pricing <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
