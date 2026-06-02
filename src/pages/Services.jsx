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
      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Comprehensive SaaS solutions engineered for performance, security, and scale.
              From cloud infrastructure to AI-driven analytics, we have you covered.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
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
            <h2 className="text-3xl font-bold text-white mb-4">How We Deliver</h2>
            <p className="text-text-secondary">Our proven 4-step workflow ensures consistent results.</p>
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

      <section className="py-16 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-text-secondary mb-8">Let us build something amazing together.</p>
            <Link
              to="/pricing"
              className="inline-flex gradient-bg text-white px-8 py-3.5 rounded-xl font-semibold text-sm gap-2 glow hover:opacity-90 transition-opacity"
            >
              View Pricing <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
