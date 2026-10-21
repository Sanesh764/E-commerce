import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Store,
  PlusCircle,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { CATEGORIES } from '../data/categories'
import { addProduct } from '../services/mockProducts'
import { useAuth } from '../context/AuthContext'
import ImageWithFallback from '../components/products/ImageWithFallback'

export function SellPage() {
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'electronics',
    stock: '10',
    imageUrl: '',
    seller: user?.name || 'Artisan Seller',
  })

  const [createdProduct, setCreatedProduct] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUsePresetImage = (sampleUrl) => {
    setFormData((prev) => ({ ...prev, imageUrl: sampleUrl }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name.trim()) {
      setError('Product title is required.')
      return
    }
    if (!formData.price || Number(formData.price) <= 0) {
      setError('Please enter a valid price in INR.')
      return
    }
    if (!formData.description.trim()) {
      setError('Product description is required.')
      return
    }

    try {
      const newProduct = addProduct({
        ...formData,
        seller: user?.name || formData.seller || 'Independent Merchant',
      })
      setCreatedProduct(newProduct)
      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'electronics',
        stock: '10',
        imageUrl: '',
        seller: user?.name || 'Artisan Seller',
      })
    } catch (err) {
      setError(err.message || 'Failed to list product.')
    }
  }

  return (
    <div className="py-6 sm:py-8 space-y-12">
      {/* Seller Introduction Hero */}
      <section className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-md">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold">
            <Store className="w-3.5 h-3.5" />
            <span>Multi-Vendor Merchant Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Grow Your Business Across India on BazaarCraft
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Whether you are an independent craftsman, home baker, fashion label, or tech builder, reach passionate buyers nationwide. No upfront platform fees.
          </p>
        </div>
      </section>

      {/* Success Notification if a product was just added */}
      {createdProduct && (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-950">
                Product Successfully Added to Local Catalog!
              </h3>
              <p className="text-xs text-emerald-800">
                &ldquo;{createdProduct.name}&rdquo; is now active in mock browse and search results.
              </p>
            </div>
          </div>
          <Link
            to={`/products/${createdProduct.id}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-sm transition whitespace-nowrap"
          >
            <span>View Product Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Main Listing Form & Image Preview Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Listing Form */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-600" />
              <span>List a New Product</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Add your product details. In Phase 1, listings are saved locally to test frontend browsing.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Handcrafted Ceramic Teacup Set"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Price (in INR ₹) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 1499"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Available Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="e.g. 15"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Seller / Brand Display Name
                </label>
                <input
                  type="text"
                  name="seller"
                  value={formData.seller}
                  onChange={handleChange}
                  placeholder="e.g. Jaipur Crafts Studio"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Image URL (HTTPS link)
              </label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
              />
              <div className="flex flex-wrap gap-2 mt-2 items-center text-[11px] text-slate-500">
                <span>Quick sample images:</span>
                <button
                  type="button"
                  onClick={() =>
                    handleUsePresetImage(
                      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80',
                    )
                  }
                  className="text-indigo-600 underline hover:text-indigo-800"
                >
                  Smartwatch
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleUsePresetImage(
                      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80',
                    )
                  }
                  className="text-indigo-600 underline hover:text-indigo-800"
                >
                  Sunglasses
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleUsePresetImage(
                      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
                    )
                  }
                  className="text-indigo-600 underline hover:text-indigo-800"
                >
                  Coffee Mug
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Product Description *
              </label>
              <textarea
                required
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe product materials, specifications, and dimensions..."
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md text-sm transition"
            >
              Publish Mock Product
            </button>
          </form>
        </div>

        {/* Live Preview Card */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4 sticky top-24">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider border-b border-slate-100 pb-2">
            Live Preview Card
          </h3>

          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
            <div className="aspect-square bg-slate-100">
              <ImageWithFallback
                src={formData.imageUrl}
                alt={formData.name || 'Preview'}
                className="w-full h-full object-cover"
                fallbackText="Preview image will appear here"
              />
            </div>
            <div className="p-4 space-y-2">
              <span className="text-[10px] uppercase font-bold text-indigo-600">
                {formData.category}
              </span>
              <h4 className="text-sm font-bold text-slate-900 truncate">
                {formData.name || 'Your Product Title'}
              </h4>
              <p className="text-xs text-slate-400">by {formData.seller || 'You'}</p>
              <p className="text-base font-extrabold text-slate-900 pt-1">
                ₹{formData.price ? Number(formData.price).toLocaleString('en-IN') : '0'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-500 leading-relaxed">
            <strong>Architecture Note:</strong> In Phase 3, this form will send multipart data to an authenticated Express endpoint with ownership verification and SQL schema validation.
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellPage
