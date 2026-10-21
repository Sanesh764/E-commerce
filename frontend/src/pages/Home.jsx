import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, TrendingUp, Store, Compass, Smartphone, Shirt, Home, BookOpen, Watch } from 'lucide-react'
import { CATEGORIES } from '../data/categories'
import { getFeaturedProducts, getPopularProducts } from '../services/mockProducts'
import ProductCard from '../components/products/ProductCard'

// Mapping icon names to Lucide icon components
const CATEGORY_ICONS = {
  Smartphone,
  Shirt,
  Home,
  BookOpen,
  Watch,
}

export function HomePage() {
  const featuredProducts = useMemo(() => getFeaturedProducts(4), [])
  const popularProducts = useMemo(() => getPopularProducts(4), [])

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-semibold tracking-wide border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Discover India's Handcrafted & Modern Marketplace</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Curated Goods from Independent Makers Across India.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Support homegrown artisans, innovative tech brands, and verified independent sellers. Handcrafted with authenticity, delivered with care.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products"
              className="flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/sell"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-md border border-white/20 transition"
            >
              <Store className="w-4 h-4" />
              <span>Become a Seller</span>
            </Link>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Shop by Category */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <Compass className="w-6 h-6 text-indigo-600" />
              Shop by Category
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Browse top categories from verified sellers
            </p>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.icon] || Compass
            return (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="group flex flex-col items-center p-5 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center transition-colors mb-3">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-400 mt-1">
                  Explore items &rarr;
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Featured Highlights
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Carefully curated items recognized for craftsmanship and quality
            </p>
          </div>
          <Link
            to="/products?sort=featured"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>See more</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trending / Popular Products */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Trending & Popular
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Top customer favorites ordered nationwide this week
            </p>
          </div>
          <Link
            to="/products?sort=popular"
            className="text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>Browse bestsellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Seller Onboarding Call To Action Section */}
      <section className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
        <div className="max-w-xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
            <Store className="w-3.5 h-3.5" />
            <span>Multi-Vendor Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Are you an Indian maker, artisan, or merchant?
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Join BazaarCraft today to showcase your products to customers across India. Simple listing, direct storefront management, and zero setup fees.
          </p>
        </div>
        <Link
          to="/sell"
          className="flex-shrink-0 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-md transition"
        >
          Start Selling Today &rarr;
        </Link>
      </section>
    </div>
  )
}

export default HomePage
