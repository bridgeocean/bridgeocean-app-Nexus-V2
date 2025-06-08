"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestAuthPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem("isAuthenticated")
    const userData = localStorage.getItem("user")

    if (authStatus === "true" && userData) {
      setIsAuthenticated(true)
      setUser(JSON.parse(userData))
    } else {
      router.push("/signin")
    }
    setIsLoading(false)
  }, [router])

  const handleSignOut = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    sessionStorage.removeItem("isAuthenticated")
    document.cookie = "isAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/signin")
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
            <CardTitle>Authentication Test - Success! ✅</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold text-green-800 dark:text-green-200">Authentication Working</h3>
              <p className="text-green-700 dark:text-green-300">You are successfully authenticated!</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">User Information:</h4>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p>
                  <strong>Email:</strong> {user?.email || "N/A"}
                </p>
                <p>
                  <strong>Role:</strong> {user?.role || "Admin"}
                </p>
                <p>
                  <strong>Name:</strong> {user?.name || "Admin User"}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
