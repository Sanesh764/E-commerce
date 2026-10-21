import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Lock, Mail, AlertCircle, Info, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { DEMO_CREDENTIALS } from '../services/mockAuth'

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  // Retrieve destination passed from guest redirect
  const redirectDestination = location.state?.from || '/'
  const promptMessage = location.state?.message

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Autofill demo credentials for easy reviewer / student testing
  const handleUseDemoAccount = () => {
    setEmail(DEMO_CREDENTIALS.email)
    setPassword(DEMO_CREDENTIALS.password)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Client-side validations
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
      return
    }

    try {
      setSubmitting(true)
      await login(email, password)
      // Navigate to intended destination
      navigate(redirectDestination, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="py-12 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 items-center justify-center font-bold text-xl mb-1">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Sign In to BazaarCraft
          </h1>
          <p className="text-xs text-slate-500">
            Welcome back! Continue shopping or managing your listings.
          </p>
        </div>

        {/* Demo Notice Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-800 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>Phase 1 Demo Authentication</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            This is a frontend mock state simulation. No real passwords or credentials are verified or sent over the network.
          </p>
          <button
            type="button"
            onClick={handleUseDemoAccount}
            className="mt-1 text-xs font-semibold text-indigo-700 underline hover:text-indigo-900"
          >
            Click here to fill Demo Account ({DEMO_CREDENTIALS.email})
          </button>
        </div>

        {/* Prompt from redirect */}
        {promptMessage && (
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-800 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
            <Info className="w-4 h-4 flex-shrink-0" />
            <span>{promptMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                autoComplete="email"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
                autoComplete="current-password"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm"
          >
            <span>{submitting ? 'Signing in...' : 'Sign In (Demo)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer / Switch to Register */}
        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          <span>Don't have an account yet? </span>
          <Link
            to="/register"
            state={{ from: redirectDestination }}
            className="font-bold text-indigo-600 hover:text-indigo-700 transition"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
