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
import { Check, ChevronRight, Clock, Star } from "lucide-react"
import DocumentUpload from "./document-upload"

export default function PartnerPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    vehicleType: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    experience: "",
    availability: "",
    additionalInfo: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleComplete = () => {
    // Simulate completion and redirect
    setTimeout(() => {
      window.location.href = "/charter"
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Become a Charter Partner</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <div className="md:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Partner Application</CardTitle>
                <CardDescription>Join our network of professional drivers and earn with your vehicle</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Progress Steps */}
                <div className="mb-8">
                  <div className="flex justify-between">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {currentStep > 1 ? <Check className="h-5 w-5" /> : "1"}
                      </div>
                      <span className="text-xs mt-1">Basic Info</span>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className="h-1 w-full bg-gray-200">
                        <div
                          className="h-1 bg-blue-600 transition-all duration-300"
                          style={{ width: currentStep > 1 ? "100%" : "0%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {currentStep > 2 ? <Check className="h-5 w-5" /> : "2"}
                      </div>
                      <span className="text-xs mt-1">Vehicle</span>
                    </div>
                    <div className="flex-1 flex items-center">
                      <div className="h-1 w-full bg-gray-200">
                        <div
                          className="h-1 bg-blue-600 transition-all duration-300"
                          style={{ width: currentStep > 2 ? "100%" : "0%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {currentStep > 3 ? <Check className="h-5 w-5" /> : "3"}
                      </div>
                      <span className="text-xs mt-1">Documents</span>
                    </div>
                  </div>
                </div>

                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Your phone number"
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Your city"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Driving Experience (Years)</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => handleSelectChange("experience", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select years of experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">Less than 1 year</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Select
                        value={formData.availability}
                        onValueChange={(value) => handleSelectChange("availability", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your availability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="weekends">Weekends only</SelectItem>
                          <SelectItem value="flexible">Flexible hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <Button onClick={handleNextStep}>
                        Next <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Vehicle Information */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Vehicle Type</Label>
                      <Select
                        value={formData.vehicleType}
                        onValueChange={(value) => handleSelectChange("vehicleType", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedan">Sedan</SelectItem>
                          <SelectItem value="suv">SUV</SelectItem>
                          <SelectItem value="luxury-sedan">Luxury Sedan</SelectItem>
                          <SelectItem value="luxury-suv">Luxury SUV</SelectItem>
                          <SelectItem value="van">Van</SelectItem>
                          <SelectItem value="bus">Bus</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vehicleYear">Year</Label>
                        <Input
                          id="vehicleYear"
                          name="vehicleYear"
                          placeholder="e.g. 2020"
                          value={formData.vehicleYear}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicleMake">Make</Label>
                        <Input
                          id="vehicleMake"
                          name="vehicleMake"
                          placeholder="e.g. Toyota"
                          value={formData.vehicleMake}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="vehicleModel">Model</Label>
                        <Input
                          id="vehicleModel"
                          name="vehicleModel"
                          placeholder="e.g. Camry"
                          value={formData.vehicleModel}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        placeholder="Any additional information about your vehicle or services you can provide..."
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                    <div className="pt-4 flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        Back
                      </Button>
                      <Button onClick={handleNextStep}>
                        Next <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Document Upload */}
                {currentStep === 3 && <DocumentUpload onBack={handlePrevStep} onComplete={handleComplete} />}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Partner Benefits</CardTitle>
                <CardDescription>Why join our charter network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Star className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Premium Clients</h4>
                      <p className="text-sm text-gray-500">Access to high-value corporate clients and VIPs</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Flexible Schedule</h4>
                      <p className="text-sm text-gray-500">Work when you want, set your own hours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Check className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Competitive Earnings</h4>
                      <p className="text-sm text-gray-500">Earn more with our premium pricing structure</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-2">Partner Requirements</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Valid driver's license
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Vehicle in excellent condition
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Clean driving record
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Professional appearance
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      Smartphone with data plan
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
