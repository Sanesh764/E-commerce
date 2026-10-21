import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Store,
  HelpCircle,
  Gift,
  CreditCard,
} from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      {/* 1. Value Proposition Strip */}
      <div className="border-b border-slate-800 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-indigo-400 rounded-xl flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">Pan-India Delivery</h4>
              <p className="text-[11px] text-slate-400">Express delivery to 19,000+ pin codes</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-indigo-400 rounded-xl flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">100% Authentic</h4>
              <p className="text-[11px] text-slate-400">Verified independent sellers & makers</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-indigo-400 rounded-xl flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">Easy Returns</h4>
              <p className="text-[11px] text-slate-400">Simulated 7-day hassle-free return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 text-indigo-400 rounded-xl flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-white">Help Center 24x7</h4>
              <p className="text-[11px] text-slate-400">Support for both buyers and sellers</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Flipkart-inspired Multi-Column Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-xs">
          
          {/* ABOUT */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              About BazaarCraft
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/products" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/sell" className="hover:text-white transition">Our Artisans</Link></li>
              <li><span className="text-slate-500 cursor-default">Careers (Hiring)</span></li>
              <li><span className="text-slate-500 cursor-default">BazaarCraft Stories</span></li>
              <li><span className="text-slate-500 cursor-default">Corporate Information</span></li>
            </ul>
          </div>

          {/* HELP */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Help & Support
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/orders" className="hover:text-white transition">Track Orders</Link></li>
              <li><Link to="/orders" className="hover:text-white transition">Shipping & Delivery</Link></li>
              <li><Link to="/orders" className="hover:text-white transition">Returns & Refunds</Link></li>
              <li><Link to="/profile" className="hover:text-white transition">Account FAQ</Link></li>
              <li><span className="text-slate-500 cursor-default">Report Infringement</span></li>
            </ul>
          </div>

          {/* CONSUMER POLICY */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Consumer Policy
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="text-slate-500 cursor-default">Cancellation & Returns</span></li>
              <li><span className="text-slate-500 cursor-default">Terms of Use</span></li>
              <li><span className="text-slate-500 cursor-default">Security</span></li>
              <li><span className="text-slate-500 cursor-default">Privacy Policy</span></li>
              <li><span className="text-slate-500 cursor-default">Grievance Redressal</span></li>
            </ul>
          </div>

          {/* MAIL US */}
          <div className="space-y-3 border-t sm:border-t-0 sm:border-l border-slate-800 sm:pl-6">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Mail Us:
            </h4>
            <div className="text-slate-400 space-y-1 leading-relaxed text-[11px]">
              <p className="font-semibold text-slate-300">BazaarCraft Internet Pvt. Ltd.</p>
              <p>Buildings Alyssa, Begonia & Clove Embassy Tech Village,</p>
              <p>Outer Ring Road, Devarabeesanahalli Village,</p>
              <p>Bengaluru, 560103, Karnataka, India</p>
            </div>
          </div>

          {/* REGISTERED OFFICE */}
          <div className="space-y-3 sm:border-l border-slate-800 sm:pl-6">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Registered Office:
            </h4>
            <div className="text-slate-400 space-y-1 leading-relaxed text-[11px]">
              <p className="font-semibold text-slate-300">BazaarCraft Marketplace Ltd.</p>
              <p>CIN: U51109KA2026PTC066107</p>
              <p>Telephone: <span className="text-indigo-400">080-4547-0000</span></p>
              <p className="text-amber-400 font-semibold pt-1">Phase 1 Demo Architecture</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Links & Copyright Bar */}
      <div className="border-t border-slate-800 bg-slate-950 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <Link to="/sell" className="flex items-center gap-1.5 hover:text-white transition">
              <Store className="w-4 h-4 text-amber-500" />
              <span>Become a Seller</span>
            </Link>
            <Link to="/orders" className="flex items-center gap-1.5 hover:text-white transition">
              <Gift className="w-4 h-4 text-amber-500" />
              <span>My Orders & Tracking</span>
            </Link>
            <Link to="/profile" className="flex items-center gap-1.5 hover:text-white transition">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>Help Center</span>
            </Link>
          </div>

          {/* Payment Partners */}
          <div className="flex items-center gap-2 text-slate-400">
            <CreditCard className="w-4 h-4 text-indigo-400" />
            <span className="text-[11px]">Supported: UPI • Cards • NetBanking (Test Mode)</span>
          </div>

          {/* Copyright */}
          <div className="text-slate-500 text-[11px]">
            &copy; {CURRENT_YEAR} BazaarCraft.com. Built for educational pair programming.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
