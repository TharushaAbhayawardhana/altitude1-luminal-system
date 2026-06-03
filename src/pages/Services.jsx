import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ServiceCard from '../components/ServiceCard'
import StepCard from '../components/StepCard'
import { servicesList, workflowSteps } from '../utils/servicesData'

export default function Services() {
  return (
    <PageTransition>
      <section className="section-spacing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-4 block">What We Do</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">
              Comprehensive SaaS solutions engineered for performance, security, and scale.
              From cloud infrastructure to AI-driven analytics, we have you covered.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06),transparent_70%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-4 block">Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How We Deliver</h2>
            <p className="text-text-secondary text-lg">Our proven 4-step workflow ensures consistent results.</p>
          </motion.div>
          <div className="max-w-2xl mx-auto">
            {workflowSteps.map((step, i) => (
              <StepCard
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.description}
                index={i}
                isLast={i === workflowSteps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-text-secondary mb-10 text-lg">Let us build something amazing together.</p>
            <Link
              to="/pricing"
              className="group inline-flex gradient-bg text-white px-10 py-4 rounded-xl font-semibold text-base gap-2 glow-lg hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-105"
            >
              View Pricing <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
