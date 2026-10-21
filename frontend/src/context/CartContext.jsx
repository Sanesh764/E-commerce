/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

const CART_STORAGE_KEY = 'marketplace_cart_items_v1'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
    } catch (err) {
      console.warn('Failed to parse cart items from storage:', err)
    }
    return []
  })

  // Synchronize cart changes to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    } catch (err) {
      console.warn('Failed to save cart to storage:', err)
    }
  }, [items])

  /**
   * Adds a product to the cart or increments its quantity.
   * Enforces stock limits.
   *
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add
   * @returns {{ success: boolean, message: string }}
   */
  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) {
      return { success: false, message: 'Invalid product' }
    }

    const availableStock = typeof product.stock === 'number' ? product.stock : 99
    if (availableStock <= 0) {
      return { success: false, message: 'This item is currently out of stock.' }
    }

    let resultMessage = ''
    let isSuccess = true

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id)

      if (existingIndex > -1) {
        const existingItem = prevItems[existingIndex]
        const newQuantity = existingItem.quantity + quantity

        if (newQuantity > availableStock) {
          resultMessage = `Only ${availableStock} items available in stock.`
          isSuccess = false
          return prevItems
        }

        const updated = [...prevItems]
        updated[existingIndex] = {
          ...existingItem,
          quantity: newQuantity,
        }
        resultMessage = `Updated ${product.name} quantity to ${newQuantity}.`
        return updated
      } else {
        if (quantity > availableStock) {
          resultMessage = `Only ${availableStock} items available in stock.`
          isSuccess = false
          return prevItems
        }

        resultMessage = `Added ${product.name} to cart.`
        return [...prevItems, { product, quantity }]
      }
    })

    return { success: isSuccess, message: resultMessage }
  }

  /**
   * Updates an item's exact quantity in the cart.
   */
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId) {
          const maxStock = item.product.stock || 99
          const safeQuantity = Math.min(newQuantity, maxStock)
          return { ...item, quantity: safeQuantity }
        }
        return item
      }),
    )
  }

  /**
   * Removes an item completely from the cart.
   */
  const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  /**
   * Clears the entire cart.
   */
  const clearCart = () => {
    setItems([])
  }

  // Calculate total item units in cart (e.g., 2 shirts + 1 book = 3 items)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  // Calculate subtotal price in INR
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0,
  )

  const value = {
    items,
    totalItems,
    subtotal,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
