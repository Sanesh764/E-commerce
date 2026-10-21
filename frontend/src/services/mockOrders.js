/**
 * Mock Orders Service
 * Manages order persistence in localStorage for simulated demo purchasing and tracking.
 */

const ORDERS_STORAGE_KEY = 'marketplace_orders_v1'

// Initial realistic orders so the user immediately sees a rich "My Orders" page
const DEFAULT_MOCK_ORDERS = [
  {
    id: 'ORD-IN-892104',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    status: 'Delivered', // 'Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'
    estimatedDelivery: 'Delivered on ' + new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
    items: [
      {
        id: 'prod-elec-1',
        name: 'AcousticPro Wireless Noise-Cancelling Headphones',
        price: 4999,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
        seller: 'SonicTech India',
        category: 'electronics',
      },
    ],
    subtotal: 4999,
    shippingFee: 0,
    total: 4999,
    shippingAddress: {
      fullName: 'Aarav Sharma',
      phone: '9876543210',
      address: 'Flat 402, Lotus Greens, Sector 45',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
    },
    paymentMethod: 'Prepaid (Simulated)',
    trackingSteps: [
      { title: 'Order Placed', date: '3 days ago', completed: true, current: false },
      { title: 'Order Confirmed', date: '3 days ago', completed: true, current: false },
      { title: 'Shipped (BlueDart Express)', date: '2 days ago', completed: true, current: false },
      { title: 'Out for Delivery', date: 'Yesterday 09:30 AM', completed: true, current: false },
      { title: 'Delivered', date: 'Yesterday 02:45 PM', completed: true, current: true },
    ],
  },
  {
    id: 'ORD-IN-731940',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    status: 'Shipped',
    estimatedDelivery: 'Arriving by tomorrow, 8:00 PM',
    items: [
      {
        id: 'prod-fash-1',
        name: 'Handcrafted Khadi Cotton Casual Shirt',
        price: 1499,
        quantity: 2,
        imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
        seller: 'Viraat Handlooms Jaipur',
        category: 'fashion',
      },
    ],
    subtotal: 2998,
    shippingFee: 0,
    total: 2998,
    shippingAddress: {
      fullName: 'Aarav Sharma',
      phone: '9876543210',
      address: 'Flat 402, Lotus Greens, Sector 45',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
    },
    paymentMethod: 'Prepaid (Simulated)',
    trackingSteps: [
      { title: 'Order Placed', date: 'Yesterday 04:15 PM', completed: true, current: false },
      { title: 'Order Confirmed', date: 'Yesterday 05:00 PM', completed: true, current: false },
      { title: 'Shipped (Delhivery Logix)', date: 'Today 08:30 AM', completed: true, current: true },
      { title: 'Out for Delivery', date: 'Expected Tomorrow', completed: false, current: false },
      { title: 'Delivered', date: 'Expected Tomorrow', completed: false, current: false },
    ],
  },
]

/**
 * Loads orders from localStorage or seeds defaults.
 */
function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('Failed to load orders from localStorage:', err)
  }
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(DEFAULT_MOCK_ORDERS))
  return [...DEFAULT_MOCK_ORDERS]
}

/**
 * Saves orders array to localStorage.
 */
function saveOrders(orders) {
  try {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
  } catch (err) {
    console.warn('Failed to save orders to localStorage:', err)
  }
}

/**
 * Returns all user orders sorted by newest first.
 */
export function getOrders() {
  const orders = loadOrders()
  return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

/**
 * Finds a single order by its ID.
 */
export function getOrderById(orderId) {
  const orders = loadOrders()
  return orders.find((o) => String(o.id).toUpperCase() === String(orderId).toUpperCase()) || null
}

/**
 * Creates and persists a new demo order.
 */
export function createOrder({ items, subtotal, shippingFee, total, shippingAddress }) {
  const orders = loadOrders()
  const randomNum = Math.floor(100000 + Math.random() * 900000)
  const orderId = `ORD-IN-${randomNum}`

  const now = new Date()
  const deliveryDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
  const deliveryFormatted = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  const newOrder = {
    id: orderId,
    createdAt: now.toISOString(),
    status: 'Processing',
    estimatedDelivery: `Expected delivery by ${deliveryFormatted}`,
    items: items.map((i) => ({
      id: i.product.id,
      name: i.product.name,
      price: i.product.price,
      quantity: i.quantity,
      imageUrl: i.product.imageUrl,
      seller: i.product.seller,
      category: i.product.category,
    })),
    subtotal,
    shippingFee,
    total,
    shippingAddress,
    paymentMethod: 'Prepaid (Simulated)',
    trackingSteps: [
      { title: 'Order Placed', date: 'Just now', completed: true, current: false },
      { title: 'Order Confirmed', date: 'Just now', completed: true, current: true },
      { title: 'Shipped', date: 'Expected tomorrow', completed: false, current: false },
      { title: 'Out for Delivery', date: `Expected ${deliveryFormatted}`, completed: false, current: false },
      { title: 'Delivered', date: `Expected ${deliveryFormatted}`, completed: false, current: false },
    ],
  }

  const updated = [newOrder, ...orders]
  saveOrders(updated)
  return newOrder
}
