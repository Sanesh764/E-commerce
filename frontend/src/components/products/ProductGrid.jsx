import ProductCard from './ProductCard'
import EmptyState from '../common/EmptyState'

export function ProductGrid({ products = [], onResetFilters }) {
  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No products matched your criteria"
        description="Try searching with different keywords, selecting another category, or clearing the active filters."
        actionText={onResetFilters ? 'Clear All Filters' : undefined}
        onAction={onResetFilters}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid
