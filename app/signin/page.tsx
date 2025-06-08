"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, AlertCircle, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Simple admin credentials that always work
  const ADMIN_EMAIL = "bridgeocean@cyberservices.com"
  const ADMIN_PASSWORD = "admin123"

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    try {
      // Simple authentication check
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Store authentication state in multiple places for redundancy
        localStorage.setItem("isAuthenticated", "true")
        sessionStorage.setItem("isAuthenticated", "true")

        localStorage.setItem(
          "user",
          JSON.stringify({
            email: ADMIN_EMAIL,
            role: "admin",
            name: "BridgeOcean Admin",
          }),
        )

        // Set cookies with proper attributes
        document.cookie = "isAuthenticated=true; path=/; max-age=86400; SameSite=Strict"

        // Force a small delay to ensure storage is complete
        setTimeout(() => {
          // Redirect to dashboard
          router.push("/dashboard")
        }, 500)
      } else {
        setError("Invalid email or password. Use the credentials shown below.")
      }
    } catch (err) {
      setError("An error occurred during sign in")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickLogin = () => {
    setEmail(ADMIN_EMAIL)
    setPassword(ADMIN_PASSWORD)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-40 h-20 relative mb-4">
            <Image src="/images/logo.png" alt="BridgeOcean Logo" fill style={{ objectFit: "contain" }} />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Sign In</CardTitle>
          <CardDescription>Access your BridgeOcean dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Admin Credentials Display */}
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-sm text-blue-800 dark:text-blue-200 mb-2">Admin Credentials:</h3>
            <div className="text-xs space-y-1 text-blue-700 dark:text-blue-300">
              <div>
                <strong>Email:</strong> {ADMIN_EMAIL}
              </div>
              <div>
                <strong>Password:</strong> {ADMIN_PASSWORD}
              </div>
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-2 w-full" onClick={handleQuickLogin}>
              Fill Credentials
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSignIn}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Lock className="mr-2 h-4 w-4" /> Sign In
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            <p>
              Need help? Contact support at{" "}
              <a href="mailto:bridgeocean@cyberservices.com" className="text-primary hover:underline">
                bridgeocean@cyberservices.com
              </a>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
