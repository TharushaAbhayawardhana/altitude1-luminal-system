import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, PayPal, and bank transfers for enterprise plans. All payments are processed securely through PayHere.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we prorate the billing accordingly.',
  },
  {
    q: 'Is there a free trial available?',
    a: 'We offer a 14-day free trial on our Pro plan with no credit card required. You can explore all features before making a commitment.',
  },
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div key={index} className="glass rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-white hover:bg-white/5 transition-colors"
          >
            {faq.q}
            <ChevronDown
              className={`h-4 w-4 text-text-secondary transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 text-sm text-text-secondary">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
