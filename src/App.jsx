import { ToastProvider } from './hooks/useToast'
import AppRouter from './routes/AppRouter'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'

export default function App() {
  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <AppRouter />
        </main>
        <Footer />
      </div>
      <Toast />
    </ToastProvider>
  )
}
