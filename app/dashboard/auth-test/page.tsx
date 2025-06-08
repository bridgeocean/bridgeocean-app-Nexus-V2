"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthTestPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Client-side only code
    if (typeof window !== "undefined") {
      const authStatus = localStorage.getItem("isAuthenticated")
      const userData = localStorage.getItem("user")

      if (authStatus === "true" && userData) {
        setIsAuthenticated(true)
        try {
          setUser(JSON.parse(userData))
        } catch (e) {
          setUser({ email: "admin@example.com", role: "Admin" })
        }
      } else {
        router.push("/signin")
      }
      setIsLoading(false)
    }
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    sessionStorage.removeItem("isAuthenticated")
    document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/signin")
  }

  // Server-side rendering safe check
  if (typeof window === "undefined") {
    return null // Return null during SSR
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Redirecting to sign in...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This page requires authentication. Please sign in to view it.</p>
            <p>
              <a href="/signin" className="text-blue-600 hover:underline">
                Go to Sign In
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
