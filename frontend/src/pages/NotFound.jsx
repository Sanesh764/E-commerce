import { Link } from 'react-router-dom'
import { AlertCircle, Home, ArrowLeft } from 'lucide-react'

export function NotFoundPage() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mb-6 shadow-sm">
        <AlertCircle className="w-8 h-8" />
      </div>

      <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2">
        404 Error
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-slate-500 max-w-md mb-8 leading-relaxed">
        We couldn&apos;t find the page you were looking for. It may have been moved, renamed, or never existed.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-xs shadow-md transition"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/products"
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Products</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
