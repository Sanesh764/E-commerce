import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react'
import { getOrders } from '../services/mockOrders'
import { formatPrice } from '../utils/currency'
import ImageWithFallback from '../components/products/ImageWithFallback'
import EmptyState from '../components/common/EmptyState'

export function OrdersPage() {
  // Initialize state directly from localStorage service (prevents cascading render)
  const [orders] = useState(() => getOrders())

  if (orders.length === 0) {
    return (
      <div className="py-12">
        <EmptyState
          icon={ShoppingBag}
          title="No orders placed yet"
          description="You haven't placed any orders on BazaarCraft yet. Explore top categories, discover handcrafted goods, and place your first demo order!"
          actionText="Explore Products"
          onAction={() => (window.location.href = '/products')}
        />
      </div>
    )
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Delivered</span>
          </span>
        )
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Truck className="w-3.5 h-3.5" />
            <span>In Transit</span>
          </span>
        )
      case 'Processing':
      case 'Placed':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5" />
            <span>Processing</span>
          </span>
        )
    }
  }

  return (
    <div className="py-6 sm:py-8 space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Orders
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Track packages, view past purchase history, and download simulated invoices
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })

          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all overflow-hidden"
            >
              {/* Card Header */}
              <div className="bg-slate-50/80 px-4 sm:px-6 py-3.5 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Order Placed</span>
                    <span className="font-bold text-slate-800">{formattedDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Total Amount</span>
                    <span className="font-extrabold text-slate-900">{formatPrice(order.total)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Ship To</span>
                    <span className="font-semibold text-slate-800">{order.shippingAddress?.fullName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono text-[11px]">
                    ID: {order.id}
                  </span>
                  <Link
                    to={`/orders/${order.id}`}
                    className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Items in this Order */}
              <div className="p-4 sm:p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(order.status)}
                    <span className="text-xs font-semibold text-slate-700">
                      {order.estimatedDelivery}
                    </span>
                  </div>
                  <Link
                    to={`/orders/${order.id}`}
                    className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <span>Track Package</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="divide-y divide-slate-100">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={item.imageUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            to={`/products/${item.id}`}
                            className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition truncate block"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-slate-500">
                            Seller: <span className="font-medium text-slate-700">{item.seller}</span> • Qty: {item.quantity}
                          </p>
                          <p className="text-xs font-bold text-slate-900 mt-1">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                        <Link
                          to={`/products/${item.id}`}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition whitespace-nowrap"
                        >
                          Buy Again
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrdersPage
