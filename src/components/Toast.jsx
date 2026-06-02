import { useToast } from '../hooks/useToast'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const colors = {
  success: 'border-success/30 bg-success/10',
  error: 'border-error/30 bg-error/10',
  warning: 'border-warning/30 bg-warning/10',
  info: 'border-accent/30 bg-accent/10',
}

const iconColors = {
  success: 'text-success',
  error: 'text-error',
  warning: 'text-warning',
  info: 'text-accent',
}

export default function Toast() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type] || Info
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className={`pointer-events-auto glass rounded-xl border p-4 flex items-start gap-3 ${colors[toast.type] || colors.info}`}
            >
              <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${iconColors[toast.type] || iconColors.info}`} />
              <p className="text-sm text-text-primary flex-1">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="text-text-secondary hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
