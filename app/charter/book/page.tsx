"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, MapPin, Users, Car, CheckCircle, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

const vehicles = [
  { id: "camry-2006", name: "Toyota Camry (2006)", pricePerHour: 10000, passengers: 4 },
  { id: "gmc-terrain", name: "GMC Terrain (2011)", pricePerHour: 20000, passengers: 7 },
]

export default function BookCharterPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
    duration: "",
    vehicle: "",
    passengers: "",
    specialRequests: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateTotal = () => {
    const selectedVehicle = vehicles.find((v) => v.id === formData.vehicle)
    if (!selectedVehicle || !formData.duration) return 0

    const duration = Number.parseInt(formData.duration)
    const basePrice = selectedVehicle.pricePerHour * Math.ceil(duration / 10) // Price per 10 hours
    return basePrice
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const selectedVehicle = vehicles.find((v) => v.id === formData.vehicle)
      if (!selectedVehicle) {
        throw new Error("Please select a vehicle")
      }

      const totalPrice = calculateTotal()

      const { data, error } = await supabase
        .from("charter_bookings")
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          pickup_location: formData.pickupLocation,
          destination: formData.destination,
          date: formData.date,
          time: formData.time,
          duration: Number.parseInt(formData.duration),
          vehicle: selectedVehicle.name,
          passengers: Number.parseInt(formData.passengers),
          special_requests: formData.specialRequests || null,
          total_price: totalPrice,
          status: "pending",
        })
        .select()

      if (error) {
        throw error
      }

      setSubmitStatus({
        type: "success",
        message:
          "Your charter booking has been submitted successfully! We will contact you shortly to confirm the details.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        pickupLocation: "",
        destination: "",
        date: "",
        time: "",
        duration: "",
        vehicle: "",
        passengers: "",
        specialRequests: "",
      })
    } catch (error: any) {
      setSubmitStatus({
        type: "error",
        message: error.message || "An error occurred while submitting your booking. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Book Charter Service</h1>
            <p className="text-muted-foreground">
              Reserve your premium charter vehicle for a comfortable and reliable journey
            </p>
          </div>

          {submitStatus && (
            <Alert className={`mb-6 ${submitStatus.type === "success" ? "border-green-500" : "border-red-500"}`}>
              {submitStatus.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <AlertDescription className={submitStatus.type === "success" ? "text-green-700" : "text-red-700"}>
                {submitStatus.message}
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Charter Booking Details
              </CardTitle>
              <CardDescription>Fill in your details and travel requirements for your charter service</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personal Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="+234 XXX XXX XXXX"
                      required
                    />
                  </div>
                </div>

                {/* Trip Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Trip Details
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="pickup">Pickup Location *</Label>
                      <Input
                        id="pickup"
                        value={formData.pickupLocation}
                        onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                        placeholder="Enter pickup address"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination">Destination *</Label>
                      <Input
                        id="destination"
                        value={formData.destination}
                        onChange={(e) => handleInputChange("destination", e.target.value)}
                        placeholder="Enter destination address"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Time *
                      </Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Vehicle & Duration
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="vehicle">Select Vehicle *</Label>
                      <Select value={formData.vehicle} onValueChange={(value) => handleInputChange("vehicle", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose vehicle" />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicles.map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id}>
                              {vehicle.name} - ₦{vehicle.pricePerHour.toLocaleString()}/10hrs
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (hours) *</Label>
                      <Input
                        id="duration"
                        type="number"
                        min="1"
                        max="240"
                        value={formData.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        placeholder="e.g., 10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="passengers" className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Passengers *
                      </Label>
                      <Input
                        id="passengers"
                        type="number"
                        min="1"
                        max="8"
                        value={formData.passengers}
                        onChange={(e) => handleInputChange("passengers", e.target.value)}
                        placeholder="Number of passengers"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Additional Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                    <Textarea
                      id="special-requests"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      placeholder="Any special requirements, stops, or requests..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* Price Summary */}
                {formData.vehicle && formData.duration && (
                  <div className="rounded-lg border p-4 bg-muted/50">
                    <h3 className="text-lg font-medium mb-2">Price Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Vehicle:</span>
                        <span>{vehicles.find((v) => v.id === formData.vehicle)?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{formData.duration} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate:</span>
                        <span>
                          ₦{vehicles.find((v) => v.id === formData.vehicle)?.pricePerHour.toLocaleString()}/10hrs
                        </span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-medium text-lg">
                        <span>Total:</span>
                        <span>₦{calculateTotal().toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        * Additional charges may apply for trips outside Lagos
                      </p>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Booking Request"}
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to our terms of service. We will contact you within 24 hours to
                  confirm your booking.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
