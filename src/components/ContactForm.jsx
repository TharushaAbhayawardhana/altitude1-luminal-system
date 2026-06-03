import { useState } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { submitContact } from '../services/api'
import { useToast } from '../hooks/useToast'

export default function ContactForm() {
  const { addToast } = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email'
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    else if (form.message.trim().length < 10) errs.message = 'At least 10 characters'
    return errs
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return

    setSubmitting(true)
    try {
      await submitContact(form)
      addToast('Message sent successfully!', 'success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      addToast('Failed to send message. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'subject', label: 'Subject', type: 'text' },
  ]

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fields.map(({ name, label, type }) => (
          <div key={name} className={name === 'subject' ? 'sm:col-span-2' : ''}>
            <label htmlFor={name} className="block text-sm font-medium text-text-secondary mb-1.5">
              {label}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                errors[name] ? 'border-error' : 'border-border'
              }`}
              placeholder={`Your ${label.toLowerCase()}`}
            />
            {errors[name] && <p className="text-xs text-error mt-1.5">{errors[name]}</p>}
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
            errors.message ? 'border-error' : 'border-border'
          }`}
          placeholder="Your message"
        />
        {errors.message && <p className="text-xs text-error mt-1.5">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="w-full gradient-bg text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 glow hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-300 disabled:opacity-50"
      >
        {submitting ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</>
        ) : (
          <><Send className="h-4 w-4" /> Send Message</>
        )}
      </button>
    </form>
  )
}
