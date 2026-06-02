import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ContactForm from '../components/ContactForm'
import FAQAccordion from '../components/FAQAccordion'
import MapPlaceholder from '../components/MapPlaceholder'

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'hello@luminalsystems.com' },
  { icon: Phone, label: 'Phone', value: '+94 11 234 5678' },
  { icon: MapPin, label: 'Address', value: '42 Galle Road, Colombo 03, Sri Lanka' },
  { icon: Clock, label: 'Hours', value: 'Mon-Fri, 9:00 AM - 6:00 PM' },
]

export default function Contact() {
  return (
    <PageTransition>
      <section className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-text-secondary max-w-xl mx-auto">
              Have a question or want to learn more? We would love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6 space-y-5">
                {contactDetails.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">{label}</p>
                      <p className="text-sm text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <MapPlaceholder />
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="pb-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-text-secondary text-sm">Quick answers to common questions.</p>
          </motion.div>
          <FAQAccordion />
        </div>
      </section>
    </PageTransition>
  )
}
