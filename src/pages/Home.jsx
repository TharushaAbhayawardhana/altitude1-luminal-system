import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, TrendingUp, Shield, Zap, Users, Sparkles, ChevronRight } from 'lucide-react'
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

function FloatingOrb({ className }) {
  return (
    <div className={`absolute rounded-full opacity-30 blur-3xl ${className}`} />
  )
}

export default function Home() {
  return (
    <PageTransition>
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <FloatingOrb className="w-[500px] h-[500px] bg-primary/20 -top-40 -left-40 animate-pulse-glow" />
        <FloatingOrb className="w-[400px] h-[400px] bg-accent/20 top-1/2 -right-40 animate-float" />
        <FloatingOrb className="w-[300px] h-[300px] bg-primary/10 bottom-20 left-1/3 animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 text-xs text-text-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              Now available in early access
            </motion.div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
              Intelligence that
              <span className="gradient-text block mt-2">powers your business</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              Luminal Systems delivers enterprise-grade SaaS solutions with cutting-edge AI, 
              robust security, and scalable infrastructure — designed for the modern enterprise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/pricing"
                className="group gradient-bg text-white px-8 py-4 rounded-xl font-semibold text-base flex items-center gap-2 glow-lg hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-105"
              >
                Get Started <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/how-it-works"
                className="glass text-white px-8 py-4 rounded-xl font-semibold text-base flex items-center gap-2 hover:bg-white/10 transition-all duration-300"
              >
                How It Works <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center glass rounded-2xl p-6 hover:bg-white/8 transition-all duration-300">
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-xs text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-4 block">Features</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Everything you need to scale
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto text-lg">
              Powerful features packed into a seamless platform.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <GlassCard>
                    <div className="h-12 w-12 rounded-xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{feature.desc}</p>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-spacing relative overflow-hidden">
        <FloatingOrb className="w-[400px] h-[400px] bg-accent/10 -bottom-40 -left-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(6,182,212,0.08),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to transform your workflow?
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto mb-10 text-lg">
              Join thousands of teams already using Luminal Systems.
            </p>
            <Link
              to="/pricing"
              className="group inline-flex gradient-bg text-white px-10 py-4 rounded-xl font-semibold text-base gap-2 glow-lg hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-105"
            >
              See Plans & Pricing <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
