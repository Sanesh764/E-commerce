import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { getProducts } from '../services/mockProducts'
import ProductGrid from '../components/products/ProductGrid'
import ProductFilter from '../components/products/ProductFilter'

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams()

  // Directly derive filter state from URL search params as single source of truth
  const category = searchParams.get('category') || 'all'
  const search = searchParams.get('search') || ''
  const sort = searchParams.get('sort') || 'featured'

  const [maxPrice, setMaxPrice] = useState(6000)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Helper to update search params
  const updateUrlParams = (newCat, newSearch, newSort) => {
    const params = new URLSearchParams()
    if (newCat && newCat !== 'all') params.set('category', newCat)
    if (newSearch && newSearch.trim()) params.set('search', newSearch.trim())
    if (newSort && newSort !== 'featured') params.set('sort', newSort)
    setSearchParams(params, { replace: true })
  }

  const handleCategoryChange = (newCat) => {
    updateUrlParams(newCat, search, sort)
    setMobileFiltersOpen(false)
  }

  const handleSearchChange = (newSearch) => {
    updateUrlParams(category, newSearch, sort)
  }

  const handleSortChange = (newSort) => {
    updateUrlParams(category, search, newSort)
  }

  const handleResetFilters = () => {
    setMaxPrice(6000)
    setSearchParams({}, { replace: true })
  }

  // Compute filtered products list
  const filteredProducts = useMemo(() => {
    return getProducts({
      search,
      category,
      sort,
      maxPrice,
    })
  }, [search, category, sort, maxPrice])

  return (
    <div className="py-6 sm:py-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore All Products
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Showing <strong className="text-slate-800">{filteredProducts.length}</strong> items
            {category !== 'all' && (
              <span>
                {' '}
                in <span className="capitalize font-semibold text-indigo-600">{category}</span>
              </span>
            )}
            {search && <span> matching &ldquo;{search}&rdquo;</span>}
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>Filters & Sort</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar Filter */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <ProductFilter
            search={search}
            setSearch={handleSearchChange}
            category={category}
            setCategory={handleCategoryChange}
            sort={sort}
            setSort={handleSortChange}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onReset={handleResetFilters}
          />
        </div>

        {/* Product Grid Results */}
        <div className="lg:col-span-3">
          <ProductGrid
            products={filteredProducts}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* Mobile Filters Slide-over / Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFiltersOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <h3 className="text-base font-bold text-slate-900">Filters & Sort</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ProductFilter
                search={search}
                setSearch={handleSearchChange}
                category={category}
                setCategory={handleCategoryChange}
                sort={sort}
                setSort={handleSortChange}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                onReset={handleResetFilters}
              />
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
            >
              Apply & Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsPage
