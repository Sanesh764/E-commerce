import { Search, RotateCcw } from 'lucide-react'
import { CATEGORIES } from '../../data/categories'
import { formatPrice } from '../../utils/currency'

export function ProductFilter({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
  maxPrice,
  setMaxPrice,
  onReset,
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-6">
      {/* Search Input */}
      <div>
        <label htmlFor="search-input" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Search Products
        </label>
        <div className="relative">
          <input
            id="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, keyword, seller..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
          Categories
        </h4>
        <div className="flex flex-col space-y-1">
          <button
            onClick={() => setCategory('all')}
            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition ${
              category === 'all'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>All Categories</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition ${
                category === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <label htmlFor="sort-select" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          id="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition"
        >
          <option value="featured">Featured First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Price Range Filter */}
      {typeof maxPrice === 'number' && setMaxPrice && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Max Price
            </span>
            <span className="text-xs font-bold text-indigo-600">
              {formatPrice(maxPrice)}
            </span>
          </div>
          <input
            type="range"
            min="500"
            max="6000"
            step="250"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>₹500</span>
            <span>₹6,000</span>
          </div>
        </div>
      )}

      {/* Reset Action */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Reset Filters</span>
      </button>
    </div>
  )
}

export default ProductFilter
