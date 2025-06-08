"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("bridgeocean@cyberservices.com")
  const [password, setPassword] = useState("admin123")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simple authentication check
      if (email === "bridgeocean@cyberservices.com" && password === "admin123") {
        // Store authentication state
        if (typeof window !== "undefined") {
          localStorage.setItem("isAuthenticated", "true")
          sessionStorage.setItem("isAuthenticated", "true")
          document.cookie = "isAuthenticated=true; path=/; max-age=86400"
        }

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>BridgeOcean Admin Login</h1>

        <div
          style={{
            backgroundColor: "#f0f9ff",
            padding: "15px",
            borderRadius: "6px",
            marginBottom: "20px",
            border: "1px solid #0ea5e9",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0", fontSize: "14px" }}>Admin Credentials:</h3>
          <p style={{ margin: "5px 0", fontSize: "12px" }}>
            <strong>Email:</strong> bridgeocean@cyberservices.com
          </p>
          <p style={{ margin: "5px 0", fontSize: "12px" }}>
            <strong>Password:</strong> admin123
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              padding: "10px",
              borderRadius: "4px",
              marginBottom: "20px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px",
              }}
              required
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px",
              }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#0ea5e9",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.7 : 1,
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
