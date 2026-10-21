import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { formatPrice } from '../../utils/currency'

export function CartSummary({ subtotal, totalItems, onProceed }) {
  // Free shipping threshold: ₹999
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 99
  const grandTotal = subtotal + shippingFee

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
      <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>Items ({totalItems})</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Standard Delivery</span>
          <span>
            {shippingFee === 0 ? (
              <span className="text-emerald-600 font-semibold">FREE</span>
            ) : (
              formatPrice(shippingFee)
            )}
          </span>
        </div>

        {subtotal < 999 && (
          <p className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
            Add items worth <strong>{formatPrice(999 - subtotal)}</strong> more to unlock FREE Delivery!
          </p>
        )}

        <div className="border-t border-slate-100 pt-3 flex justify-between text-base font-bold text-slate-900">
          <span>Estimated Total</span>
          <span className="text-indigo-600">{formatPrice(grandTotal)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      {onProceed ? (
        <button
          onClick={onProceed}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      ) : (
        <Link
          to="/checkout"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}

      {/* Trust Badge */}
      <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 justify-center">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>Safe & Secure Simulated Checkout</span>
      </div>
    </div>
  )
}

export default CartSummary
