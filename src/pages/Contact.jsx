import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import ContactForm from '../components/ContactForm'
import FAQAccordion from '../components/FAQAccordion'

const contactDetails = [
  { icon: Mail, label: 'Email', value: 'hello@luminalsystems.com' },
  { icon: Phone, label: 'Phone', value: '+94 11 234 5678' },
  { icon: MapPin, label: 'Address', value: '42 Galle Road, Colombo 03, Sri Lanka' },
  { icon: Clock, label: 'Hours', value: 'Mon-Fri, 9:00 AM - 6:00 PM' },
]

export default function Contact() {
  return (
    <PageTransition>
      <section className="section-spacing">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-4 block">Contact</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-text-secondary max-w-xl mx-auto text-lg">
              Have a question or want to learn more? We would love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="glass rounded-2xl p-6 md:p-8 space-y-6">
                <h3 className="text-sm font-semibold text-white">Contact Information</h3>
                {contactDetails.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary font-medium">{label}</p>
                      <p className="text-sm text-white mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-500">
                <div className="p-4 border-b border-border">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Our Location
                  </h3>
                </div>
                <div className="relative w-full">
                  <iframe
                    src="https://www.google.com/maps?q=6.8912,79.8652&output=embed&z=15"
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Luminal Systems Location"
                    className="block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.05),transparent_70%)]" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-4 block">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-text-secondary text-lg">Quick answers to common questions.</p>
          </motion.div>
          <FAQAccordion />
        </div>
      </section>
    </PageTransition>
  )
}
