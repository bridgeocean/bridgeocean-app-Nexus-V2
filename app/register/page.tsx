"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, AlertCircle, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    position: "",
    reason: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.reason) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")

      // Check if email already exists
      if (existingUsers.some((user: any) => user.email === formData.email)) {
        setError("An account with this email already exists")
        setIsLoading(false)
        return
      }

      // Create new user registration
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password, // In production, this should be hashed
        company: formData.company,
        position: formData.position,
        reason: formData.reason,
        status: "pending", // pending, approved, rejected
        role: "user",
        registeredAt: new Date().toISOString(),
      }

      // Save to localStorage (in production, this would be an API call)
      const updatedUsers = [...existingUsers, newUser]
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))

      // Also save to pending approvals for admin
      const pendingApprovals = JSON.parse(localStorage.getItem("pendingApprovals") || "[]")
      pendingApprovals.push(newUser)
      localStorage.setItem("pendingApprovals", JSON.stringify(pendingApprovals))

      setSuccess(true)
    } catch (err) {
      setError("An error occurred during registration")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 flex flex-col items-center">
            <div className="w-40 h-20 relative mb-4">
              <Image src="/images/logo.png" alt="BridgeOcean Logo" fill style={{ objectFit: "contain" }} />
            </div>
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <CardTitle className="text-2xl font-bold text-center">Registration Submitted</CardTitle>
            <CardDescription className="text-center">
              Your access request has been submitted successfully. You will receive an email notification once your
              account is approved by the administrator.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Link href="/signin">
              <Button className="w-full">Back to Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-40 h-20 relative mb-4">
            <Image src="/images/logo.png" alt="BridgeOcean Logo" fill style={{ objectFit: "contain" }} />
          </div>
          <CardTitle className="text-2xl font-bold">Request Access</CardTitle>
          <CardDescription>Submit your information to request access to the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your Company Name"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Position/Role</Label>
                <Input
                  id="position"
                  name="position"
                  type="text"
                  placeholder="Your Job Title"
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">
                  Reason for Access <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="reason"
                  name="reason"
                  placeholder="Please explain why you need access to the dashboard..."
                  value={formData.reason}
                  onChange={handleInputChange}
                  required
                  rows={3}
                />
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
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <UserPlus className="mr-2 h-4 w-4" /> Submit Request
                  </span>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
