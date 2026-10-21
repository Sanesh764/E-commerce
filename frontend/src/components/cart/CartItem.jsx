import { Link } from 'react-router-dom'
import { Plus, Minus, Trash2 } from 'lucide-react'
import { formatPrice } from '../../utils/currency'
import ImageWithFallback from '../products/ImageWithFallback'

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item
  const maxStock = product.stock || 99
  const itemTotal = (product.price || 0) * quantity

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-2xl border border-slate-200/80 gap-4">
      {/* Product Image and Details */}
      <div className="flex items-center gap-4 flex-1">
        <Link
          to={`/products/${product.id}`}
          className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200"
        >
          <ImageWithFallback
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </Link>

        <div className="flex-1 min-w-0">
          <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
            {product.category}
          </span>
          <Link
            to={`/products/${product.id}`}
            className="block text-sm font-semibold text-slate-800 hover:text-indigo-600 transition truncate"
          >
            {product.name}
          </Link>
          <p className="text-xs text-slate-400">Sold by: {product.seller}</p>
          <p className="text-xs font-bold text-slate-900 mt-1">
            {formatPrice(product.price)} each
          </p>
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
        {/* Quantity Controls */}
        <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
          <button
            onClick={() => onUpdateQuantity(product.id, quantity - 1)}
            disabled={quantity <= 1}
            className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Decrease quantity"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-8 text-center text-xs font-bold text-slate-800">
            {quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(product.id, quantity + 1)}
            disabled={quantity >= maxStock}
            className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition"
            aria-label="Increase quantity"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Item Total */}
        <div className="text-right min-w-[80px]">
          <span className="block text-xs text-slate-400 sm:hidden">Total</span>
          <span className="text-sm font-bold text-slate-900">
            {formatPrice(itemTotal)}
          </span>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => onRemove(product.id)}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default CartItem
