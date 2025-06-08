"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type AuthUser = {
  email: string
  name: string
  role: string
} | null

type AuthContextType = {
  user: AuthUser
  isAuthenticated: boolean
  isLoading: boolean
  signOut: () => void
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signOut: () => {},
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authStatus = localStorage.getItem("isAuthenticated") === "true"
        const userData = localStorage.getItem("user")

        if (authStatus && userData) {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          setIsAuthenticated(true)
        } else {
          setUser(null)
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Protect dashboard routes
  useEffect(() => {
    if (!isLoading && !isAuthenticated && pathname?.startsWith("/dashboard")) {
      router.push("/signin")
    }
    if (!isLoading && !isAuthenticated && pathname?.startsWith("/admin")) {
      router.push("/signin")
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const signOut = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    document.cookie = "isAuthenticated=; path=/; max-age=0"

    setUser(null)
    setIsAuthenticated(false)
    router.push("/signin")
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, isLoading, signOut }}>{children}</AuthContext.Provider>
}
