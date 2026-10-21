import { Loader2 } from 'lucide-react'

export function LoadingSpinner({ text = 'Loading...', fullPage = false }) {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 space-y-3">
      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      <p className="text-sm font-medium text-slate-500">{text}</p>
    </div>
  )

  if (fullPage) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        {content}
      </div>
    )
  }

  return content
}

export default LoadingSpinner
