import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Star, ShoppingBag, Check } from 'lucide-react'
import { formatPrice } from '../../utils/currency'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import ImageWithFallback from './ImageWithFallback'
import Badge from '../common/Badge'

export function ProductCard({ product }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [justAdded, setJustAdded] = useState(false)

  const isOutOfStock = product.stock <= 0
  const isLowStock = product.stock > 0 && product.stock <= 5

  // Simulated list price / discount calculation (Flipkart-style pricing clarity)
  const originalPrice = Math.round(product.price * 1.35)
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isOutOfStock) return

    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: location.pathname + location.search,
          productId: product.id,
          message: 'Please sign in to add items to your shopping cart.',
        },
      })
      return
    }

    addToCart(product, 1)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1500)
  }

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 overflow-hidden">
      {/* Product Image Link */}
      <Link
        to={`/products/${product.id}`}
        className="relative block aspect-[4/3] sm:aspect-square bg-slate-50 overflow-hidden"
      >
        <ImageWithFallback
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isFeatured && (
            <Badge variant="amber" className="shadow-xs font-bold text-[10px]">
              Special Deal
            </Badge>
          )}
          {isLowStock && (
            <Badge variant="danger" className="shadow-xs font-bold text-[10px]">
              Only {product.stock} left!
            </Badge>
          )}
          {isOutOfStock && (
            <Badge variant="default" className="shadow-xs bg-slate-900 text-white border-slate-900 font-bold text-[10px]">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Star Rating Badge (Flipkart-style) */}
        {product.rating && (
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 bg-emerald-700 text-white px-2 py-0.5 rounded-md text-[11px] font-bold shadow-xs">
            <span>{product.rating.toFixed(1)}</span>
            <Star className="w-3 h-3 fill-white text-white" />
          </div>
        )}
      </Link>

      {/* Card Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-bold text-indigo-600 uppercase tracking-wider text-[10px]">
              {product.category}
            </span>
            <span className="truncate max-w-[120px] text-slate-400" title={product.seller}>
              {product.seller}
            </span>
          </div>

          {/* Product Title */}
          <Link
            to={`/products/${product.id}`}
            className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 line-clamp-2 leading-snug transition"
          >
            {product.name}
          </Link>
        </div>

        {/* Pricing & Add to Cart Section */}
        <div className="pt-2 border-t border-slate-100 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[11px] font-bold text-emerald-600">
                {discountPercent}% off
              </span>
              <span className="text-[10px] text-slate-400">• Free delivery</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            title={
              isOutOfStock
                ? 'Out of stock'
                : !isAuthenticated
                  ? 'Sign in to add to cart'
                  : 'Add to cart'
            }
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition flex-shrink-0 ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
