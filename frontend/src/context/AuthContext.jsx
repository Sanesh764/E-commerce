/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState } from 'react'
import { getCurrentUser, mockLogin, mockRegister, mockLogout } from '../services/mockAuth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser())
  const [loading, setLoading] = useState(false)

  const login = async (email, password) => {
    setLoading(true)
    try {
      const res = await mockLogin(email, password)
      setUser(res.user)
      return res.user
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    setLoading(true)
    try {
      const res = await mockRegister(name, email, password)
      setUser(res.user)
      return res.user
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    mockLogout()
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
