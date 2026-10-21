import { INITIAL_PRODUCTS } from '../data/products'

const STORAGE_KEY = 'marketplace_products_v1'

/**
 * Loads products from localStorage or defaults to INITIAL_PRODUCTS.
 * Allows newly added seller products to persist locally during testing.
 */
function loadProductsFromStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('Failed to parse products from localStorage:', err)
  }
  return [...INITIAL_PRODUCTS]
}

/**
 * Saves current products list to localStorage.
 */
function saveProductsToStorage(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch (err) {
    console.warn('Failed to save products to localStorage:', err)
  }
}

/**
 * Retrieves all products with optional filters.
 *
 * @param {Object} [filterOptions]
 * @param {string} [filterOptions.search]
 * @param {string} [filterOptions.category]
 * @param {string} [filterOptions.sort] - 'featured', 'price-low', 'price-high', 'popular', 'newest'
 * @param {number} [filterOptions.minPrice]
 * @param {number} [filterOptions.maxPrice]
 * @returns {Array} Filtered and sorted products
 */
export function getProducts(filterOptions = {}) {
  const { search = '', category = '', sort = 'featured', minPrice, maxPrice } = filterOptions
  let results = loadProductsFromStorage()

  // Category filter
  if (category && category !== 'all') {
    results = results.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase(),
    )
  }

  // Search keyword filter (matches name, description, or seller)
  if (search.trim()) {
    const term = search.toLowerCase().trim()
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.seller.toLowerCase().includes(term),
    )
  }

  // Price range filter
  if (typeof minPrice === 'number' && !isNaN(minPrice)) {
    results = results.filter((p) => p.price >= minPrice)
  }
  if (typeof maxPrice === 'number' && !isNaN(maxPrice)) {
    results = results.filter((p) => p.price <= maxPrice)
  }

  // Sorting
  switch (sort) {
    case 'price-low':
      results.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      results.sort((a, b) => b.price - a.price)
      break
    case 'popular':
      results.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0))
      break
    case 'rating':
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      break
    case 'featured':
    default:
      // Featured first, then rating
      results.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1
        if (!a.isFeatured && b.isFeatured) return 1
        return (b.rating || 0) - (a.rating || 0)
      })
      break
  }

  return results
}

/**
 * Finds a single product by its unique ID.
 */
export function getProductById(id) {
  const products = loadProductsFromStorage()
  return products.find((p) => String(p.id) === String(id)) || null
}

/**
 * Returns featured products for the storefront.
 */
export function getFeaturedProducts(limit = 4) {
  const products = loadProductsFromStorage()
  return products.filter((p) => p.isFeatured).slice(0, limit)
}

/**
 * Returns trending / popular products.
 */
export function getPopularProducts(limit = 4) {
  const products = loadProductsFromStorage()
  return products.filter((p) => p.isPopular).slice(0, limit)
}

/**
 * Returns related products from the same category.
 */
export function getRelatedProducts(currentId, category, limit = 4) {
  const products = loadProductsFromStorage()
  return products
    .filter((p) => p.category === category && String(p.id) !== String(currentId))
    .slice(0, limit)
}

/**
 * Adds a new mock product (used by the /sell page).
 *
 * @param {Object} productData
 * @returns {Object} Newly created product with ID
 */
export function addProduct(productData) {
  const products = loadProductsFromStorage()
  const newProduct = {
    id: `prod-custom-${Date.now()}`,
    name: productData.name,
    description: productData.description,
    price: Number(productData.price) || 0,
    category: productData.category,
    seller: productData.seller || 'Verified Local Merchant',
    stock: Number(productData.stock) || 1,
    imageUrl:
      productData.imageUrl ||
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80',
    isFeatured: false,
    isPopular: false,
    rating: 5.0,
    reviewsCount: 1,
    createdAt: new Date().toISOString(),
  }

  const updated = [newProduct, ...products]
  saveProductsToStorage(updated)
  return newProduct
}

/**
 * Resets products to the factory defaults.
 */
export function resetProducts() {
  saveProductsToStorage(INITIAL_PRODUCTS)
  return INITIAL_PRODUCTS
}
