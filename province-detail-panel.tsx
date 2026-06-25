"use client"

// ============================================================================
// AuthProvider — autentikasi sederhana berbasis client untuk PROTOTIPE.
// Menggunakan kredensial dummy (admin / admin123) dan menyimpan sesi di
// sessionStorage. Untuk produksi, ganti dengan auth server yang sesungguhnya.
// ============================================================================

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

// Kredensial dummy untuk demo prototipe.
const DUMMY_USER = "admin"
const DUMMY_PASS = "admin123"
const STORAGE_KEY = "berastrack-auth"

interface AuthContextValue {
  isAuthenticated: boolean
  /** Selesai membaca status awal dari storage */
  ready: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [ready, setReady] = useState(false)

  // Pulihkan sesi saat aplikasi dimuat.
  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem(STORAGE_KEY) === "true")
    setReady(true)
  }, [])

  function login(username: string, password: string) {
    if (username.trim() === DUMMY_USER && password === DUMMY_PASS) {
      sessionStorage.setItem(STORAGE_KEY, "true")
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth harus dipakai di dalam <AuthProvider>")
  return ctx
}
