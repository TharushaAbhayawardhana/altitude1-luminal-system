import { Link } from 'react-router-dom'
import { Sparkles, Heart } from 'lucide-react'

const footerLinks = {
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Contact', to: '/contact' },
  ],
  Products: [
    { label: 'Pricing', to: '/pricing' },
    { label: 'Dashboard', to: '#' },
    { label: 'API', to: '#' },
    { label: 'Integrations', to: '#' },
  ],
  Support: [
    { label: 'Documentation', to: '#' },
    { label: 'FAQ', to: '/contact#faq' },
    { label: 'Status', to: '#' },
    { label: 'Privacy Policy', to: '#' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gray-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-lg font-bold gradient-text">Luminal</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed">
              Intelligent SaaS solutions for modern businesses. We empower teams with cutting-edge technology.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-text-secondary hover:text-accent transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Luminal Systems. All rights reserved.
          </p>
          <p className="text-xs text-text-secondary flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-error" /> by Luminal Team
          </p>
        </div>
      </div>
    </footer>
  )
}
