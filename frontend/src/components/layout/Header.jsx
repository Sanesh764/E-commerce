import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  ShoppingBag,
  Search,
  User,
  LogOut,
  Store,
  Menu,
  X,
  Package,
  ChevronDown,
  UserCheck,
} from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import CategoryStrip from './CategoryStrip'

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const { totalItems } = useCart()
  const { user, isAuthenticated, logout } = useAuth()

  const [searchQuery, setSearchQuery] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search).get('search') || ''
    }
    return ''
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setMobileMenuOpen(false)
    } else {
      navigate('/products')
    }
  }

  const handleLogout = () => {
    logout()
    setUserDropdownOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* Primary Top Header: Deep Indigo Brand Color */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-800 text-white border-b border-indigo-700/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-3 sm:gap-6">
            
            {/* 1. Left: Marketplace Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-white text-indigo-700 flex items-center justify-center font-black text-xl shadow-xs group-hover:scale-105 transition-transform">
                B
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white leading-none">
                  Bazaar<span className="text-amber-300">Craft</span>
                </span>
                <span className="text-[10px] font-semibold text-indigo-200 tracking-wider uppercase mt-0.5">
                  Explore <span className="text-amber-300 font-bold">Plus</span>
                </span>
              </div>
            </Link>

            {/* 2. Center: Prominent White Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-2xl lg:max-w-3xl relative items-center"
            >
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for Products, Brands and More"
                  className="w-full pl-11 pr-24 py-2.5 text-sm bg-white text-slate-800 border-2 border-transparent focus:border-amber-400 rounded-xl focus:outline-none focus:ring-3 focus:ring-indigo-300/40 transition placeholder:text-slate-400 shadow-xs"
                />
                <Search className="w-4 h-4 text-indigo-600 absolute left-3.5 top-3.5 pointer-events-none" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg transition flex items-center gap-1 shadow-xs"
                >
                  Search
                </button>
              </div>
            </form>

            {/* 3. Right: Action Controls with Crisp Contrast */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              
              {/* Account Dropdown */}
              <div className="relative" ref={dropdownRef}>
                {isAuthenticated ? (
                  <button
                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10 rounded-xl transition"
                    aria-expanded={userDropdownOpen}
                  >
                    <div className="w-7 h-7 rounded-full bg-white text-indigo-700 flex items-center justify-center font-bold text-xs shadow-xs">
                      {user?.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="hidden sm:inline max-w-[110px] truncate text-xs font-bold text-white">
                      {user?.name || 'Account'}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-indigo-200" />
                  </button>
                ) : (
                  <button
                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-bold bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl transition shadow-xs"
                    aria-expanded={userDropdownOpen}
                  >
                    <User className="w-4 h-4 text-indigo-600" />
                    <span>Sign In</span>
                    <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
                  </button>
                )}

                {/* Dropdown Menu (Clean White Card Overlay) */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white text-slate-800 border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {isAuthenticated ? (
                      <>
                        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/70 rounded-t-2xl">
                          <p className="text-[11px] text-slate-400 font-medium">Hello,</p>
                          <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
                          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/profile"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                          >
                            <UserCheck className="w-4 h-4 text-slate-400" />
                            <span>My Profile</span>
                          </Link>
                          <Link
                            to="/orders"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                          >
                            <Package className="w-4 h-4 text-slate-400" />
                            <span>My Orders</span>
                          </Link>
                          <Link
                            to="/sell"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                          >
                            <Store className="w-4 h-4 text-slate-400" />
                            <span>Seller Dashboard</span>
                          </Link>
                        </div>
                        <div className="border-t border-slate-100 pt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out (Demo)</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">New customer?</span>
                          <Link
                            to="/register"
                            onClick={() => setUserDropdownOpen(false)}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
                          >
                            Sign Up
                          </Link>
                        </div>
                        <div className="py-1">
                          <Link
                            to="/login"
                            state={{ from: location.pathname }}
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                          >
                            <User className="w-4 h-4 text-slate-400" />
                            <span>Sign In (Demo Account)</span>
                          </Link>
                          <Link
                            to="/orders"
                            onClick={() => setUserDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition"
                          >
                            <Package className="w-4 h-4 text-slate-400" />
                            <span>My Orders</span>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* My Orders Direct Desktop Shortcut */}
              <Link
                to="/orders"
                className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white hover:text-amber-300 hover:bg-white/10 rounded-xl transition"
              >
                <Package className="w-4 h-4 text-indigo-200" />
                <span>Orders</span>
              </Link>

              {/* Become a Seller Link */}
              <Link
                to="/sell"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white hover:text-amber-300 hover:bg-white/10 rounded-xl transition"
              >
                <Store className="w-4 h-4 text-indigo-200" />
                <span>Become a Seller</span>
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                aria-label="View shopping cart"
                className="relative flex items-center gap-2 px-3 py-2 text-white hover:bg-white/10 rounded-xl transition"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-white" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2.5 bg-amber-400 text-slate-950 font-black text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-white">Cart</span>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-label="Toggle mobile menu"
                className="md:hidden p-2 text-white hover:bg-white/10 rounded-xl transition"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search Bar (Mobile Viewport) */}
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands and more"
                className="w-full pl-10 pr-20 py-2 text-xs bg-white text-slate-800 border border-transparent rounded-xl focus:outline-none shadow-xs"
              />
              <Search className="w-3.5 h-3.5 text-indigo-600 absolute left-3.5 top-2.5" />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-amber-500 text-slate-950 text-[11px] font-bold rounded-lg"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-indigo-800 bg-indigo-900 text-white px-4 py-4 space-y-3">
          <div className="flex flex-col gap-1 text-sm font-semibold text-slate-100">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-xl"
                >
                  <UserCheck className="w-4 h-4 text-amber-300" />
                  <span>My Profile ({user?.name})</span>
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-xl"
                >
                  <Package className="w-4 h-4 text-amber-300" />
                  <span>My Orders</span>
                </Link>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 bg-white text-indigo-700 font-bold rounded-xl"
              >
                <User className="w-4 h-4" />
                <span>Sign In to Your Account</span>
              </Link>
            )}

            <Link
              to="/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-xl text-white"
            >
              <Store className="w-4 h-4 text-amber-300" />
              <span>Become a Seller</span>
            </Link>
          </div>
        </div>
      )}

      {/* Dedicated Category Strip */}
      <CategoryStrip />
    </header>
  )
}

export default Header
