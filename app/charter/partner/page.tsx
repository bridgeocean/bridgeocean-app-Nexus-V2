"use client"

import type React from "react"

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState({
    identification: null,
    vehicleRegistration: null,
    insurance: null,
    vehiclePhotos: [],
  })
  const [termsAccepted, setTermsAccepted] = useState({
    terms: false,
    backgroundCheck: false,
  })
  const [formErrors, setFormErrors] = useState({
    files: false,
    terms: false,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const files = e.target.files
    if (files && files.length > 0) {
      if (fileType === "vehiclePhotos") {
        setUploadedFiles((prev) => ({
          ...prev,
          [fileType]: [...(prev[fileType] || []), ...Array.from(files)],
        }))
      } else {
        setUploadedFiles((prev) => ({
          ...prev,
          [fileType]: files[0],
        }))
      }
    }
  }

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setTermsAccepted((prev) => ({
      ...prev,
      [id]: checked,
    }))

    if (id === "terms" && checked) {
      setFormErrors((prev) => ({
        ...prev,
        terms: false,
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate files and terms
    const filesUploaded =
      uploadedFiles.identification &&
      uploadedFiles.vehicleRegistration &&
      uploadedFiles.insurance &&
      uploadedFiles.vehiclePhotos.length > 0

    const termsValid = termsAccepted.terms && termsAccepted.backgroundCheck

    setFormErrors({
      files: !filesUploaded,
      terms: !termsValid,
    })

    if (!filesUploaded || !termsValid) {
      return
    }

    // Simulate form submission
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      alert("Application submitted successfully! We'll review your information and contact you soon.")
      // Reset form or redirect
      setFormStep(1)
    }, 2000)
  }

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
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {formErrors.files && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                          Please upload all required documents before submitting
                        </div>
                      )}

                      <div className="grid gap-6 md:grid-cols-2">
                        {/* Identification Document */}
                        <div className="space-y-2">
                          <Label htmlFor="identification">Means of Identification</Label>
                          <div
                            className={`border-2 ${uploadedFiles.identification ? "border-green-300 bg-green-50" : "border-dashed border-gray-300"} rounded-lg p-4`}
                          >
                            <div className="flex flex-col items-center justify-center space-y-2 text-center">
                              {!uploadedFiles.identification ? (
                                <>
                                  <Upload className="h-8 w-8 text-gray-400" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium">Upload NIN slip or International Passport</p>
                                    <p className="text-xs text-gray-500">PDF, JPG or PNG (Max 5MB)</p>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => document.getElementById("identification")?.click()}
                                  >
                                    Choose File
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-8 w-8 text-green-500" />
                                  <p className="text-sm font-medium text-green-600">File uploaded</p>
                                  <p className="text-xs text-gray-500">
                                    {(uploadedFiles.identification as File)?.name}
                                  </p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setUploadedFiles((prev) => ({ ...prev, identification: null }))}
                                  >
                                    Change File
                                  </Button>
                                </>
                              )}
                              <input
                                id="identification"
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, "identification")}
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Insurance Certificate */}
                        <div className="space-y-2">
                          <Label htmlFor="insurance">Insurance Certificate</Label>
                          <div
                            className={`border-2 ${uploadedFiles.insurance ? "border-green-300 bg-green-50" : "border-dashed border-gray-300"} rounded-lg p-4`}
                          >
                            <div className="flex flex-col items-center justify-center space-y-2 text-center">
                              {!uploadedFiles.insurance ? (
                                <>
                                  <Upload className="h-8 w-8 text-gray-400" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium">Upload current insurance certificate</p>
                                    <p className="text-xs text-gray-500">PDF, JPG or PNG (Max 5MB)</p>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => document.getElementById("insurance")?.click()}
                                  >
                                    Choose File
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-8 w-8 text-green-500" />
                                  <p className="text-sm font-medium text-green-600">File uploaded</p>
                                  <p className="text-xs text-gray-500">{(uploadedFiles.insurance as File)?.name}</p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setUploadedFiles((prev) => ({ ...prev, insurance: null }))}
                                  >
                                    Change File
                                  </Button>
                                </>
                              )}
                              <input
                                id="insurance"
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, "insurance")}
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Vehicle Registration */}
                        <div className="space-y-2">
                          <Label htmlFor="vehicleRegistration">Vehicle Registration</Label>
                          <div
                            className={`border-2 ${uploadedFiles.vehicleRegistration ? "border-green-300 bg-green-50" : "border-dashed border-gray-300"} rounded-lg p-4`}
                          >
                            <div className="flex flex-col items-center justify-center space-y-2 text-center">
                              {!uploadedFiles.vehicleRegistration ? (
                                <>
                                  <Upload className="h-8 w-8 text-gray-400" />
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium">Upload vehicle registration document</p>
                                    <p className="text-xs text-gray-500">PDF, JPG or PNG (Max 5MB)</p>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => document.getElementById("vehicleRegistration")?.click()}
                                  >
                                    Choose File
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <CheckCircle className="h-8 w-8 text-green-500" />
                                  <p className="text-sm font-medium text-green-600">File uploaded</p>
                                  <p className="text-xs text-gray-500">
                                    {(uploadedFiles.vehicleRegistration as File)?.name}
                                  </p>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setUploadedFiles((prev) => ({ ...prev, vehicleRegistration: null }))}
                                  >
                                    Change File
                                  </Button>
                                </>
                              )}
                              <input
                                id="vehicleRegistration"
                                type="file"
                                className="hidden"
                                onChange={(e) => handleFileChange(e, "vehicleRegistration")}
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Vehicle Photos */}
                        <div className="space-y-2">
                          <Label htmlFor="vehiclePhotos">Vehicle Photos</Label>
                          <div
                            className={`border-2 ${uploadedFiles.vehiclePhotos.length > 0 ? "border-green-300 bg-green-50" : "border-dashed border-gray-300"} rounded-lg p-4`}
                          >
                            <div className="flex flex-col items-center justify-center space-y-2 text-center">
                              <div className="w-full">
                                {uploadedFiles.vehiclePhotos.length > 0 ? (
                                  <>
                                    <div className="flex items-center justify-center mb-2">
                                      <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                                      <p className="text-sm font-medium text-green-600">
                                        {uploadedFiles.vehiclePhotos.length} photo
                                        {uploadedFiles.vehiclePhotos.length !== 1 ? "s" : ""} selected
                                      </p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                      {uploadedFiles.vehiclePhotos.slice(0, 3).map((file, index) => (
                                        <div
                                          key={index}
                                          className="aspect-square bg-gray-100 rounded-md overflow-hidden"
                                        >
                                          <img
                                            src={URL.createObjectURL(file as File) || "/placeholder.svg"}
                                            alt={`Vehicle photo ${index + 1}`}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium">
                                        Upload 4-6 high-quality photos of your vehicle
                                      </p>
                                      <p className="text-xs text-gray-500">JPG or PNG (Max 5MB each)</p>
                                    </div>
                                  </>
                                )}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => document.getElementById("vehiclePhotos")?.click()}
                                  className="mt-2"
                                >
                                  {uploadedFiles.vehiclePhotos.length > 0 ? "Add More Photos" : "Choose Files"}
                                </Button>
                              </div>
                              <input
                                id="vehiclePhotos"
                                type="file"
                                multiple
                                className="hidden"
                                onChange={(e) => handleFileChange(e, "vehiclePhotos")}
                                accept=".jpg,.jpeg,.png"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {formErrors.terms && (
                          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                            Please accept the terms and conditions to continue
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="terms"
                            checked={termsAccepted.terms}
                            onCheckedChange={(checked) => handleCheckboxChange("terms", checked as boolean)}
                          />
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
                          <Checkbox
                            id="backgroundCheck"
                            checked={termsAccepted.backgroundCheck}
                            onCheckedChange={(checked) => handleCheckboxChange("backgroundCheck", checked as boolean)}
                          />
                          <Label htmlFor="backgroundCheck" className="text-sm">
                            I consent to a background check and vehicle inspection
                          </Label>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button variant="outline" onClick={() => setFormStep(2)} className="flex-1" type="button">
                          Back
                        </Button>
                        <Button className="flex-1" type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin mr-2">⏳</span> Submitting...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </Button>
                      </div>
                    </form>
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
