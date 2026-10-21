import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  AlertTriangle,
  PackageCheck,
  CreditCard,
  MapPin,
  Phone,
  User,
  Truck,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatPrice } from '../utils/currency'
import { createOrder } from '../services/mockOrders'
import ImageWithFallback from '../components/products/ImageWithFallback'

export function CheckoutPage() {
  const { items, subtotal, totalItems, clearCart } = useCart()
  const { user } = useAuth()

  // Shipping form state
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Aarav Sharma',
    phone: '9876543210',
    address: 'Flat 402, Lotus Greens, Sector 45',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560034',
  })

  const [placedOrder, setPlacedOrder] = useState(null)

  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 99
  const grandTotal = subtotal + shippingFee

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()

    // Create and persist order in mock order history
    const newOrder = createOrder({
      items,
      subtotal,
      shippingFee,
      total: grandTotal,
      shippingAddress: formData,
    })

    setPlacedOrder(newOrder)
    clearCart()
  }

  // If order was just placed, show the success confirmation view
  if (placedOrder) {
    return (
      <div className="py-12 max-w-xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            Simulated Demo Order Confirmed
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Thank you for your order!
          </h1>
          <p className="text-sm text-slate-500">
            Order Reference: <strong className="text-slate-800">{placedOrder.id}</strong>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left space-y-3 shadow-xs text-xs">
          <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
            Shipping Information
          </h3>
          <p className="font-semibold text-slate-700">{placedOrder.shippingAddress?.fullName}</p>
          <p className="text-slate-500">{placedOrder.shippingAddress?.address}</p>
          <p className="text-slate-500">
            {placedOrder.shippingAddress?.city}, {placedOrder.shippingAddress?.state} - {placedOrder.shippingAddress?.pincode}
          </p>
          <p className="text-slate-500">Phone: {placedOrder.shippingAddress?.phone}</p>
          <div className="pt-2 border-t border-slate-100 flex justify-between font-bold text-slate-900">
            <span>Total Paid:</span>
            <span className="text-indigo-600">{formatPrice(placedOrder.total)}</span>
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 text-left">
          <strong>Persistent Order Demo:</strong> This order has been saved to your simulated order history. You can track its delivery status anytime under <strong>My Orders</strong>.
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link
            to={`/orders/${placedOrder.id}`}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
          >
            <Truck className="w-4 h-4" />
            <span>Track This Order</span>
          </Link>
          <Link
            to="/orders"
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
          >
            View All Orders
          </Link>
        </div>
      </div>
    )
  }

  // If user opened checkout directly with an empty cart
  if (items.length === 0) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <PackageCheck className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
        <p className="text-xs text-slate-500">
          You cannot checkout without items in your cart. Add some products to continue.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Products</span>
        </Link>
      </div>
    )
  }

  return (
    <div className="py-6 sm:py-8 space-y-6">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Demo Checkout
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review shipping address and order summary before placing the simulated order
        </p>
      </div>

      {/* Demo Warning Banner */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-800">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-amber-900 block mb-0.5">
            Phase 1 Frontend Prototype Notice
          </strong>
          <span>
            This checkout flow is purely visual for UI testing. It does not connect to MySQL, Express, or Razorpay. No real credit card or bank details are collected.
          </span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Shipping & Contact Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>1. Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contact Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Street Address / House No / Colony
                </label>
                <input
                  type="text"
                  required
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  required
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  PIN Code
                </label>
                <input
                  type="text"
                  required
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector (Demo UI) */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>2. Payment Method</span>
            </h3>

            <div className="p-3 rounded-xl border-2 border-indigo-600 bg-indigo-50/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-4 border-indigo-600 bg-white" />
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Demo Mode Checkout (Simulated)
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Razorpay test mode will be integrated in Phase 5
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-indigo-700">Test Ready</span>
            </div>
          </div>
        </div>

        {/* Order Review Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5 sticky top-24">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
            Order Items ({totalItems})
          </h3>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-3 text-xs">
                <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 truncate">{item.product.name}</p>
                  <p className="text-slate-400">Qty: {item.quantity}</p>
                </div>
                <span className="font-bold text-slate-900">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Charges</span>
              <span>{shippingFee === 0 ? <strong className="text-emerald-600">FREE</strong> : formatPrice(shippingFee)}</span>
            </div>
            <div className="border-t border-slate-100 pt-2 flex justify-between text-sm font-bold text-slate-900">
              <span>Grand Total</span>
              <span className="text-indigo-600">{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md text-sm transition"
          >
            Place Demo Order ({formatPrice(grandTotal)})
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>No real bank transaction will occur</span>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CheckoutPage
