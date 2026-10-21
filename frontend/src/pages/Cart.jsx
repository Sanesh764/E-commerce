import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import EmptyState from '../components/common/EmptyState'

export function CartPage() {
  const navigate = useNavigate()
  const { items, totalItems, subtotal, updateQuantity, removeFromCart, clearCart } = useCart()
  const { isAuthenticated } = useAuth()

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', {
        state: {
          from: '/checkout',
          message: 'Please sign in to proceed with checkout.',
        },
      })
      return
    }
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          icon={ShoppingBag}
          title="Your shopping cart is empty"
          description="Looks like you haven't added any products to your cart yet. Explore handcrafted Indian goods, fashion, books, and electronics!"
          actionText="Start Shopping Now"
          onAction={() => navigate('/products')}
        />
      </div>
    )
  }

  return (
    <div className="py-6 sm:py-8 space-y-6">
      {/* Page Title & Clear Cart */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review your selected items before proceeding to demo checkout
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <button
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        </div>
      </div>

      {/* Cart Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1 sticky top-24">
          <CartSummary
            subtotal={subtotal}
            totalItems={totalItems}
            onProceed={handleProceedToCheckout}
          />
        </div>
      </div>
    </div>
  )
}

export default CartPage
