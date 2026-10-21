import { PackageSearch } from 'lucide-react'

export function EmptyState({
  title = 'No items found',
  description = 'Try adjusting your search terms or filters to find what you are looking for.',
  icon: Icon = PackageSearch,
  actionText,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 my-8 text-center bg-white border border-slate-200/80 rounded-2xl max-w-lg mx-auto shadow-sm">
      <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-md">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState
