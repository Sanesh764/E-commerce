import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LoadingSpinner from './components/common/LoadingSpinner'

// Lazy-loaded route pages for code splitting
const HomePage = lazy(() => import('./pages/Home'))
const ProductsPage = lazy(() => import('./pages/Products'))
const ProductDetailsPage = lazy(() => import('./pages/ProductDetails'))
const LoginPage = lazy(() => import('./pages/Login'))
const RegisterPage = lazy(() => import('./pages/Register'))
const CartPage = lazy(() => import('./pages/Cart'))
const CheckoutPage = lazy(() => import('./pages/Checkout'))
const SellPage = lazy(() => import('./pages/Sell'))
const OrdersPage = lazy(() => import('./pages/Orders'))
const OrderDetailsPage = lazy(() => import('./pages/OrderDetails'))
const ProfilePage = lazy(() => import('./pages/Profile'))
const NotFoundPage = lazy(() => import('./pages/NotFound'))

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
            {/* Common Flipkart-style Header with Category Strip */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
              <Suspense fallback={<LoadingSpinner fullPage text="Loading marketplace..." />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/sell" element={<SellPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                  <Route path="/orders/:orderId" element={<OrderDetailsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>

            {/* Redesigned Footer */}
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
