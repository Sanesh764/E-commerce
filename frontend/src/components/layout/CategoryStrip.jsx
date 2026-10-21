import { Link, useLocation } from 'react-router-dom'
import {
  Smartphone,
  Shirt,
  Home,
  BookOpen,
  Watch,
  Grid,
} from 'lucide-react'
import { CATEGORIES } from '../../data/categories'

const CATEGORY_ICONS = {
  Smartphone,
  Shirt,
  Home,
  BookOpen,
  Watch,
}

export function CategoryStrip() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const currentCategory = searchParams.get('category')

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Category navigation"
          className="flex items-center justify-between gap-4 py-2.5 overflow-x-auto no-scrollbar scroll-smooth"
        >
          {/* All Categories shortcut */}
          <Link
            to="/products"
            className={`flex flex-col items-center justify-center min-w-[72px] sm:min-w-[80px] p-1.5 rounded-xl group transition-all ${
              !currentCategory && location.pathname === '/products'
                ? 'text-indigo-600 font-bold'
                : 'text-slate-700 hover:text-indigo-600'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center text-slate-600 group-hover:text-indigo-600 mb-1 transition-colors">
              <Grid className="w-5 h-5" />
            </div>
            <span className="text-xs font-medium tracking-tight text-center whitespace-nowrap">
              All Products
            </span>
          </Link>

          {/* Dynamic Categories */}
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.icon] || Grid
            const isActive = currentCategory === cat.id

            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className={`flex flex-col items-center justify-center min-w-[72px] sm:min-w-[84px] p-1.5 rounded-xl group transition-all ${
                  isActive
                    ? 'text-indigo-600 font-bold'
                    : 'text-slate-700 hover:text-indigo-600'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium tracking-tight text-center whitespace-nowrap">
                  {cat.name}
                </span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default CategoryStrip
