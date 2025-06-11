"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, User, Mail, Phone, MapPin, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewCandidatePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    stage: "Screening",
    status: "Active",
    address: "",
    licenseNumber: "",
    vehicleOwned: false,
    notes: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone) {
        throw new Error("Please fill in all required fields (Name, Email, Phone)")
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address")
      }

      console.log("Submitting candidate data:", formData)
      
      // Prepare the data with proper formatting
      const candidateData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        stage: formData.stage,
        status: formData.status.toLowerCase(),
        last_contact: new Date().toISOString(),
        notes: `Address: ${formData.address}\nLicense: ${formData.licenseNumber}\nVehicle Owned: ${formData.vehicleOwned ? "Yes" : "No"}\n\nNotes: ${formData.notes}`,
      }

      console.log("Formatted candidate data:", candidateData)

      // Make the API call
      const response = await fetch("/api/candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(candidateData),
      })

      console.log("API response status:", response.status)
      
      if (!response.ok) {
        const errorText = await response.text()
        console.error("API error response:", errorText)
        
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { error: errorText }
        }
        
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to add candidate`)
      }

      const data = await response.json()
      console.log("API success response:", data)

      // Show success
      setSuccess(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        stage: "Screening",
        status: "Active",
        address: "",
        licenseNumber: "",
        vehicleOwned: false,
        notes: "",
      })

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push("/dashboard")
      }, 3000)

    } catch (error) {
      console.error("Error adding candidate:", error)
      setError(error.message || "Failed to add candidate. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Candidate Added Successfully!</h2>
              <p className="text-muted-foreground mb-4">
                The new candidate has been successfully added to the database.
              </p>
              <p className="text-sm text-muted-foreground">Redirecting to dashboard in 3 seconds...</p>
              <Button 
                className="mt-4" 
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Add New Candidate</h2>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Candidate Information</CardTitle>
              <CardDescription>Enter the details for the new driver candidate</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Enter full name"
                        className="pl-10"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">Means of Identification</Label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="license"
                        placeholder="Enter ID number"
                        className="pl-10"
                        value={formData.licenseNumber}
                        onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      placeholder="Enter full address"
                      className="pl-10"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Initial Stage</Label>
                    <Select
                      value={formData.stage}
                      onValueChange={(value) => setFormData({ ...formData, stage: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Screening">Screening</SelectItem>
                        <SelectItem value="Selection">Selection</SelectItem>
                        <SelectItem value="Interview">Interview</SelectItem>
                        <SelectItem value="Onboarding">Onboarding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="On Hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vehicle-owned"
                    checked={formData.vehicleOwned}
                    onCheckedChange={(checked) => setFormData({ ...formData, vehicleOwned: checked })}
                  />
                  <Label htmlFor="vehicle-owned">Candidate owns a vehicle</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter any additional notes about the candidate..."
                    className="min-h-[100px]"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <div className="flex gap-4">
                  <Link href="/dashboard" className="flex-1">
                    <Button variant="outline" className="w-full" disabled={isSubmitting}>
                      Cancel
                    </Button>
                  </Link>
                  <Button type="submit" className="flex-1" disabled={isSubmitting}>
                    {isSubmitting ? "Adding Candidate..." : "Add Candidate"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
