import { useState } from 'react'
import { ImageOff } from 'lucide-react'

export function ImageWithFallback({
  src,
  alt = 'Product image',
  className = '',
  fallbackText = 'Image not available',
}) {
  const [hasError, setHasError] = useState(false)

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 border border-dashed border-slate-200 ${className}`}
      >
        <ImageOff className="w-8 h-8 mb-1 stroke-1" />
        <span className="text-xs text-slate-400 text-center font-medium">
          {fallbackText}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  )
}

export default ImageWithFallback
