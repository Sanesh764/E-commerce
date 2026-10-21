import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Star,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  ChevronRight,
  ArrowLeft,
  Store,
} from 'lucide-react'
import { getProductById, getRelatedProducts } from '../services/mockProducts'
import { formatPrice } from '../utils/currency'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import ImageWithFallback from '../components/products/ImageWithFallback'
import ProductCard from '../components/products/ProductCard'
import Badge from '../components/common/Badge'

export function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()

  const product = useMemo(() => getProductById(id), [id])
  const relatedProducts = useMemo(() => {
    if (!product) return []
    return getRelatedProducts(product.id, product.category, 4)
  }, [product])

  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState('')

  if (!product) {
    return (
      <div className="py-16 text-center max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The product you are looking for may have been moved, removed, or is temporarily unavailable.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>
    )
  }

  const isOutOfStock = product.stock <= 0
  const maxStock = product.stock || 1

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1)
      setFeedbackMessage('')
    }
  }

  const handleIncreaseQuantity = () => {
    if (quantity < maxStock) {
      setQuantity((q) => q + 1)
      setFeedbackMessage('')
    } else {
      setFeedbackMessage(`Maximum available stock is ${maxStock} items.`)
    }
  }

  const handleAddToCart = () => {
    if (isOutOfStock) return

    // Guest redirect requirement
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: location.pathname,
          productId: product.id,
          message: 'Please log in to add items to your cart.',
        },
      })
      return
    }

    const res = addToCart(product, quantity)
    if (res.success) {
      setJustAdded(true)
      setFeedbackMessage('Item added to your shopping cart!')
      setTimeout(() => {
        setJustAdded(false)
        setFeedbackMessage('')
      }, 2500)
    } else {
      setFeedbackMessage(res.message)
    }
  }

  return (
    <div className="py-6 sm:py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto">
        <Link to="/" className="hover:text-indigo-600 transition">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link to="/products" className="hover:text-indigo-600 transition">
          Products
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <Link
          to={`/products?category=${product.category}`}
          className="hover:text-indigo-600 capitalize transition"
        >
          {product.category}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-slate-800 font-semibold truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
        {/* Product Image Viewport */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.isFeatured && (
            <div className="absolute top-4 left-4">
              <Badge variant="amber" className="shadow-md">
                Featured Product
              </Badge>
            </div>
          )}
        </div>

        {/* Product Purchase & Details Column */}
        <div className="flex flex-col space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating ? product.rating.toFixed(1) : '4.8'}</span>
                <span className="text-slate-400">({product.reviewsCount || 42} reviews)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Seller Information */}
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
              <Store className="w-4 h-4 text-indigo-600" />
              <span>
                Sold by <strong className="text-slate-800">{product.seller}</strong>
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-medium">Verified Merchant</span>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                (Inclusive of all taxes)
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {isOutOfStock ? (
                <span className="text-rose-600 font-bold">● Out of Stock</span>
              ) : product.stock <= 5 ? (
                <span className="text-amber-600 font-bold">
                  ● Hurry, only {product.stock} units remaining!
                </span>
              ) : (
                <span className="text-emerald-600 font-bold">
                  ● In Stock ({product.stock} units available)
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={handleIncreaseQuantity}
                  disabled={quantity >= maxStock || isOutOfStock}
                  className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm shadow-md transition ${
                  isOutOfStock
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>
                      {isAuthenticated ? 'Add to Cart' : 'Sign In to Add to Cart'}
                    </span>
                  </>
                )}
              </button>
            </div>

            {feedbackMessage && (
              <p
                className={`text-xs font-medium ${
                  feedbackMessage.includes('Added')
                    ? 'text-emerald-600'
                    : 'text-amber-700'
                }`}
              >
                {feedbackMessage}
              </p>
            )}
          </div>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
            <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50 text-slate-600">
              <Truck className="w-4 h-4 text-indigo-600 mb-1" />
              <span className="text-[11px] font-semibold">Fast Shipping</span>
            </div>
            <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50 text-slate-600">
              <ShieldCheck className="w-4 h-4 text-indigo-600 mb-1" />
              <span className="text-[11px] font-semibold">Authentic</span>
            </div>
            <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-50 text-slate-600">
              <RotateCcw className="w-4 h-4 text-indigo-600 mb-1" />
              <span className="text-[11px] font-semibold">7-Day Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            More in {product.category.toUpperCase()}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetailsPage
