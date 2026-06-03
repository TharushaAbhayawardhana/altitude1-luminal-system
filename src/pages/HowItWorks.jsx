import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Route, Cpu, BarChart3 } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const steps = [
  {
    step: 1,
    title: 'Discovery Call',
    description: 'We schedule a 30-minute call to understand your business needs, goals, and current challenges. This helps us tailor the perfect solution for you.',
    icon: Search,
  },
  {
    step: 2,
    title: 'Custom Strategy',
    description: 'Our team designs a comprehensive roadmap tailored to your specific requirements, including architecture, timeline, and deliverables.',
    icon: Route,
  },
  {
    step: 3,
    title: 'Deployment',
    description: 'We deploy your solution using agile methodologies, with continuous integration, testing, and regular progress updates.',
    icon: Cpu,
  },
  {
    step: 4,
    title: 'Scale & Optimize',
    description: 'Post-deployment, we continuously monitor, optimize, and scale your solution to ensure it evolves with your growing business needs.',
    icon: BarChart3,
  },
]

export default function HowItWorks() {
  return (
    <PageTransition>
      <section className="section-spacing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-4 block">Process</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h1>
            <p className="text-text-secondary max-w-xl mx-auto text-lg">
              From discovery to deployment, our streamlined process ensures you get the best results, fast.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden sm:block opacity-40" />
            <div className="space-y-0">
              {steps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="relative flex gap-6 sm:pl-14"
                  >
                    <div className="hidden sm:flex absolute left-0 flex-col items-center">
                      <div className="h-12 w-12 rounded-full gradient-bg flex items-center justify-center shadow-lg">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="glass rounded-2xl p-6 md:p-8 flex-1 mb-6 hover:border-white/15 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-500">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="sm:hidden h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          Step {step.step}: {step.title}
                        </h3>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.06),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-text-secondary mb-10 text-lg">Take the first step toward transforming your business.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="group gradient-bg text-white px-10 py-4 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2 glow-lg hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-105"
              >
                See Plans <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="glass text-white px-10 py-4 rounded-xl font-semibold text-base inline-flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/15 transition-all duration-300"
              >
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
