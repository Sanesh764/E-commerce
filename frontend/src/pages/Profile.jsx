import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Store,
  CheckCircle2,
  Save,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getOrders } from '../services/mockOrders'

export function ProfilePage() {
  const { user } = useAuth()
  const orders = getOrders()

  const [name, setName] = useState(user?.name || 'Aarav Sharma')
  const [email] = useState(user?.email || 'buyer@demo.com')
  const [phone, setPhone] = useState('9876543210')
  const [gender, setGender] = useState('Male')
  const [address, setAddress] = useState('Flat 402, Lotus Greens, Sector 45')
  const [city, setCity] = useState('Bengaluru')
  const [state, setState] = useState('Karnataka')
  const [pincode, setPincode] = useState('560034')

  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  return (
    <div className="py-6 sm:py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          My Profile & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Manage your personal information, saved delivery addresses, and account security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Left Column: Quick Stats & Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-indigo-100 text-indigo-700 font-extrabold text-2xl flex items-center justify-center mx-auto border-2 border-indigo-200 shadow-xs">
              {name ? name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{name}</h3>
              <p className="text-xs text-slate-400">{email}</p>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                ⭐ BazaarCraft Plus Member
              </span>
            </div>
          </div>

          {/* Quick Shortcuts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-1 text-xs font-semibold text-slate-700">
            <Link
              to="/orders"
              className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition"
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-indigo-600" />
                <span>My Orders</span>
              </div>
              <span className="text-slate-400 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                {orders.length}
              </span>
            </Link>

            <Link
              to="/sell"
              className="flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-xl transition"
            >
              <div className="flex items-center gap-2.5">
                <Store className="w-4 h-4 text-indigo-600" />
                <span>Seller Dashboard</span>
              </div>
              <span className="text-indigo-600 text-[11px]">Manage &rarr;</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Editable Information & Addresses */}
        <div className="lg:col-span-3 space-y-6">
          {savedSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Profile information successfully updated!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-600" />
                <span>Personal Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (Account ID)
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      disabled
                      value={email}
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other / Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Saved Delivery Address */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span>Primary Delivery Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address / Flat / Building
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition text-sm"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
