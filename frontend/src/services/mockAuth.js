/**
 * Mock Authentication Service
 * 
 * NOTE: This is a client-side simulation for Phase 1 frontend development and UX testing.
 * It does NOT replace real backend authentication. No passwords are transmitted or securely hashed.
 * In Phase 2, this file will be superseded by the Express & JWT authentication API.
 */

const AUTH_STORAGE_KEY = 'marketplace_demo_auth_user'

export const DEMO_CREDENTIALS = {
  email: 'buyer@demo.com',
  password: 'Password123!',
}

/**
 * Returns current authenticated mock user or null.
 */
export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (raw) {
      return JSON.parse(raw)
    }
  } catch (err) {
    console.warn('Error reading demo auth user:', err)
  }
  return null
}

/**
 * Simulates user login with validation.
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ user: Object }>}
 */
export async function mockLogin(email, password) {
  // Simulate network latency (250ms) for realistic UX state testing
  await new Promise((resolve) => setTimeout(resolve, 250))

  if (!email || !password) {
    throw new Error('Please enter both email and password.')
  }

  const cleanEmail = email.trim().toLowerCase()

  // Standard demo user profile
  const user = {
    id: `usr-${cleanEmail.replace(/[^a-z0-9]/g, '') || 'demo'}`,
    name: cleanEmail.includes('buyer') ? 'Aarav Sharma' : cleanEmail.split('@')[0],
    email: cleanEmail,
    role: 'buyer_seller',
    isDemo: true,
    loggedInAt: new Date().toISOString(),
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  return { user }
}

/**
 * Simulates user registration.
 *
 * @param {string} name
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ user: Object }>}
 */
export async function mockRegister(name, email, password) {
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (!name || !email || !password) {
    throw new Error('All registration fields are required.')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.')
  }

  const cleanEmail = email.trim().toLowerCase()

  const user = {
    id: `usr-${Date.now()}`,
    name: name.trim(),
    email: cleanEmail,
    role: 'buyer_seller',
    isDemo: true,
    loggedInAt: new Date().toISOString(),
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
  return { user }
}

/**
 * Logs out the current mock user.
 */
export function mockLogout() {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}
