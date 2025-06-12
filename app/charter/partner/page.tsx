"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Car, DollarSign, Shield, Users, Upload, CheckCircle } from "lucide-react"

const vehicleTypes = ["Sedan", "SUV", "Luxury Sedan", "Luxury SUV", "Van", "Bus", "Convertible", "Sports Car"]

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Earnings",
    description: "Earn up to 70% of booking revenue",
  },
  {
    icon: Shield,
    title: "Insurance Coverage",
    description: "Comprehensive insurance for all bookings",
  },
  {
    icon: Users,
    title: "Professional Support",
    description: "24/7 customer and partner support",
  },
  {
    icon: Car,
    title: "Fleet Management",
    description: "Professional maintenance and care",
  },
]

export default function PartnerPage() {
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    personalInfo: {},
    vehicleInfo: {},
    documents: {},
  })

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Partner With Bridgeocean
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join our premium charter fleet and start earning with your vehicle today
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Why Partner With Us?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Maximize your vehicle's earning potential with our premium charter service
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit, index) => (
                <Card key={index}>
                  <CardHeader className="text-center">
                    <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Form */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Register Your Vehicle</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Complete the registration process to join our charter fleet
                </p>
              </div>

              {/* Progress Steps */}
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          formStep >= step ? "bg-primary text-primary-foreground" : "bg-muted-foreground text-white"
                        }`}
                      >
                        {formStep > step ? <CheckCircle className="h-4 w-4" /> : step}
                      </div>
                      {step < 3 && <div className="w-12 h-0.5 bg-muted-foreground mx-2" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Steps */}
              {formStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Tell us about yourself</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="Enter your first name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Enter your last name" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" placeholder="Enter your phone number" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" placeholder="Enter your full address" />
                    </div>
                    <Button onClick={() => setFormStep(2)} className="w-full">
                      Next: Vehicle Information
                    </Button>
                  </CardContent>
                </Card>
              )}

              {formStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Vehicle Information</CardTitle>
                    <CardDescription>Details about your vehicle</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="make">Make</Label>
                        <Input id="make" placeholder="e.g., Mercedes-Benz" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input id="model" placeholder="e.g., S-Class" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Year</Label>
                        <Input id="year" placeholder="e.g., 2022" />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Vehicle Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select vehicle type" />
                          </SelectTrigger>
                          <SelectContent>
                            {vehicleTypes.map((type) => (
                              <SelectItem key={type} value={type.toLowerCase()}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passengers">Passenger Capacity</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select capacity" />
                          </SelectTrigger>
                          <SelectContent>
                            {[2, 4, 5, 7, 8, 12, 15].map((capacity) => (
                              <SelectItem key={capacity} value={capacity.toString()}>
                                {capacity} passengers
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="license-plate">License Plate</Label>
                        <Input id="license-plate" placeholder="Enter license plate" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <Input id="color" placeholder="Vehicle color" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Vehicle Features</Label>
                      <div className="grid gap-2 md:grid-cols-3">
                        {[
                          "Air Conditioning",
                          "Leather Seats",
                          "WiFi",
                          "GPS Navigation",
                          "Bluetooth",
                          "Premium Sound",
                          "Sunroof",
                          "Tinted Windows",
                          "USB Charging",
                        ].map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox id={feature} />
                            <Label htmlFor={feature} className="text-sm">
                              {feature}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setFormStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={() => setFormStep(3)} className="flex-1">
                        Next: Documents
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {formStep === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Required Documents</CardTitle>
                    <CardDescription>Upload the necessary documents for verification</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h4 className="font-medium mb-2">Means of Identification</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Upload NIN slip or International Passport
                          </p>
                          <Button variant="outline" size="sm">
                            Choose File
                          </Button>
                        </div>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h4 className="font-medium mb-2">Vehicle Registration</h4>
                          <p className="text-sm text-muted-foreground mb-4">Upload vehicle registration document</p>
                          <Button variant="outline" size="sm">
                            Choose File
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h4 className="font-medium mb-2">Insurance Certificate</h4>
                          <p className="text-sm text-muted-foreground mb-4">Upload current insurance certificate</p>
                          <Button variant="outline" size="sm">
                            Choose File
                          </Button>
                        </div>
                        <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h4 className="font-medium mb-2">Vehicle Photos</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Upload 4-6 high-quality photos of your vehicle
                          </p>
                          <Button variant="outline" size="sm">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <a href="/terms" className="text-primary hover:underline">
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="background-check" />
                        <Label htmlFor="background-check" className="text-sm">
                          I consent to a background check and vehicle inspection
                        </Label>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setFormStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button className="flex-1">Submit Application</Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
