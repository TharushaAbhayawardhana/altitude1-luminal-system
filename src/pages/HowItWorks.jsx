import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Route, Cpu, BarChart3 } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import StepCard from '../components/StepCard'

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
      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              How It <span className="gradient-text">Works</span>
            </h1>
            <p className="text-text-secondary max-w-xl mx-auto">
              From discovery to deployment, our streamlined process ensures you get the best results, fast.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary hidden sm:block" />
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
                      <div className="h-10 w-10 rounded-full gradient-bg flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div className="glass rounded-2xl p-6 flex-1 mb-6 hover:border-border-hover transition-all">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="sm:hidden h-8 w-8 rounded-lg gradient-bg flex items-center justify-center">
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-white">
                          Step {step.step}: {step.title}
                        </h3>
                      </div>
                      <p className="text-text-secondary text-sm ml-0 sm:ml-0">
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

      <section className="py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-text-secondary mb-8">Take the first step toward transforming your business.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/pricing"
                className="gradient-bg text-white px-8 py-3.5 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 glow hover:opacity-90 transition-opacity"
              >
                See Plans <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="glass text-white px-8 py-3.5 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 hover:bg-surface-hover transition-all"
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
