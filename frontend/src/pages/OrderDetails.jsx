import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Package,
  ArrowLeft,
  CheckCircle2,
  Truck,
  MapPin,
  CreditCard,
  Download,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react'
import { getOrderById } from '../services/mockOrders'
import { formatPrice } from '../utils/currency'
import ImageWithFallback from '../components/products/ImageWithFallback'

export function OrderDetailsPage() {
  const { orderId } = useParams()
  const order = useMemo(() => getOrderById(orderId), [orderId])

  if (!order) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800">Order Not Found</h2>
        <p className="text-xs text-slate-500">
          We could not find an order matching reference #{orderId}. It may have expired or was placed in a different browser session.
        </p>
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to My Orders</span>
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="py-6 sm:py-8 space-y-8">
      {/* Back button and Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <Link
            to="/orders"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Orders</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Order #{order.id}</span>
          </h1>
          <p className="text-xs text-slate-500">
            Placed on <span className="font-semibold text-slate-700">{formattedDate}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      {/* Simulated Live Order Tracking Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Package Status: <span className="text-indigo-600">{order.status}</span>
              </h2>
              <p className="text-xs text-slate-500">{order.estimatedDelivery}</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 self-start sm:self-auto">
            Simulated Tracking Active
          </span>
        </div>

        {/* Flipkart-inspired Horizontal Tracking Steps */}
        <div className="py-4">
          <div className="relative flex flex-col md:flex-row justify-between gap-6 md:gap-0">
            {order.trackingSteps.map((step, idx) => {
              const isLast = idx === order.trackingSteps.length - 1
              return (
                <div
                  key={idx}
                  className="flex-1 flex md:flex-col items-start md:items-center relative group"
                >
                  {/* Connector Line (Desktop) */}
                  {!isLast && (
                    <div
                      className={`hidden md:block absolute top-4 left-1/2 w-full h-1 -translate-y-1/2 z-0 ${
                        step.completed ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}

                  {/* Step Milestone Circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs relative z-10 flex-shrink-0 transition-all ${
                      step.completed
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : step.current
                          ? 'bg-indigo-600 text-white ring-4 ring-indigo-100'
                          : 'bg-slate-100 text-slate-400 border border-slate-300'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>

                  {/* Step Label and Timestamp */}
                  <div className="ml-3 md:ml-0 md:mt-3 md:text-center">
                    <p
                      className={`text-xs font-bold ${
                        step.completed || step.current
                          ? 'text-slate-900'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{step.date}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Items on Left, Shipping/Payment on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Purchased Items List */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
            <Package className="w-4 h-4 text-indigo-600" />
            <span>Items in this Shipment ({order.items.length})</span>
          </h3>

          <div className="divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <Link
                      to={`/products/${item.id}`}
                      className="text-sm font-semibold text-slate-900 hover:text-indigo-600 transition truncate block"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Seller: <strong className="text-slate-700">{item.seller}</strong> • Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-bold text-slate-900 mt-1">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/products/${item.id}`}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 text-xs font-semibold rounded-lg transition whitespace-nowrap"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: Delivery Address & Summary */}
        <div className="space-y-6">
          {/* Shipping Address */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
              <span>Delivery Address</span>
            </h4>
            <div className="text-xs text-slate-600 space-y-1">
              <p className="font-bold text-slate-900">{order.shippingAddress?.fullName}</p>
              <p>{order.shippingAddress?.address}</p>
              <p>
                {order.shippingAddress?.city}, {order.shippingAddress?.state} -{' '}
                {order.shippingAddress?.pincode}
              </p>
              <p className="pt-1 text-slate-500">Phone: {order.shippingAddress?.phone}</p>
            </div>
          </div>

          {/* Payment & Invoice Summary */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Payment Details</span>
            </h4>
            <div className="text-xs space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span>Payment Mode</span>
                <span className="font-semibold text-slate-800">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span>
                  {order.shippingFee === 0 ? (
                    <strong className="text-emerald-600">FREE</strong>
                  ) : (
                    formatPrice(order.shippingFee)
                  )}
                </span>
              </div>
              <div className="border-t border-slate-100 pt-2 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Paid</span>
                <span className="text-indigo-600">{formatPrice(order.total)}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>BazaarCraft Buyer Protection Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage
