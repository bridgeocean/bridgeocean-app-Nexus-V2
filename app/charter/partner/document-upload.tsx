"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface FileWithPreview extends File {
  preview?: string
}

interface DocumentUploadProps {
  onBack: () => void
  onComplete: () => void
}

export default function DocumentUpload({ onBack, onComplete }: DocumentUploadProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // File states
  const [identification, setIdentification] = useState<FileWithPreview | null>(null)
  const [insurance, setInsurance] = useState<FileWithPreview | null>(null)
  const [registration, setRegistration] = useState<FileWithPreview | null>(null)
  const [vehiclePhotos, setVehiclePhotos] = useState<FileWithPreview[]>([])

  // Agreement states
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeBackground, setAgreeBackground] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const files = e.target.files
    if (files && files.length > 0) {
      if (fileType === "vehiclePhotos") {
        const filesArray = Array.from(files).map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        )
        setVehiclePhotos(filesArray)
      } else {
        const file = files[0]
        const fileWithPreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        })

        switch (fileType) {
          case "identification":
            setIdentification(fileWithPreview)
            break
          case "insurance":
            setInsurance(fileWithPreview)
            break
          case "registration":
            setRegistration(fileWithPreview)
            break
        }
      }
    }
  }

  // Simulate file upload with progress
  const simulateUpload = () => {
    setIsSubmitting(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setShowSuccessMessage(true)
          setTimeout(() => {
            onComplete()
          }, 1500)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!identification || !insurance || !registration || vehiclePhotos.length === 0) {
      alert("Please upload all required documents")
      return
    }

    if (!agreeTerms || !agreeBackground) {
      alert("Please agree to the terms and conditions")
      return
    }

    // Simulate upload
    simulateUpload()
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-2">Required Documents</h2>
      <p className="text-gray-500 mb-6">Upload the necessary documents for verification</p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Identification */}
          <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="mb-4">
              <Upload className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">Means of Identification</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">Upload NIN slip or International Passport</p>

            <input
              type="file"
              id="identification"
              className="hidden"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, "identification")}
            />
            <Label htmlFor="identification" className="cursor-pointer">
              <Button
                type="button"
                variant="outline"
                className={identification ? "bg-green-50 text-green-600 border-green-200" : ""}
              >
                {identification ? "File Selected" : "Choose File"}
              </Button>
            </Label>
            {identification && <p className="text-sm text-green-600 mt-2">{identification.name}</p>}
          </div>

          {/* Insurance */}
          <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="mb-4">
              <Upload className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">Insurance Certificate</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">Upload current insurance certificate</p>

            <input
              type="file"
              id="insurance"
              className="hidden"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, "insurance")}
            />
            <Label htmlFor="insurance" className="cursor-pointer">
              <Button
                type="button"
                variant="outline"
                className={insurance ? "bg-green-50 text-green-600 border-green-200" : ""}
              >
                {insurance ? "File Selected" : "Choose File"}
              </Button>
            </Label>
            {insurance && <p className="text-sm text-green-600 mt-2">{insurance.name}</p>}
          </div>

          {/* Vehicle Registration */}
          <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="mb-4">
              <Upload className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">Vehicle Registration</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">Upload vehicle registration document</p>

            <input
              type="file"
              id="registration"
              className="hidden"
              accept="image/*,.pdf"
              onChange={(e) => handleFileChange(e, "registration")}
            />
            <Label htmlFor="registration" className="cursor-pointer">
              <Button
                type="button"
                variant="outline"
                className={registration ? "bg-green-50 text-green-600 border-green-200" : ""}
              >
                {registration ? "File Selected" : "Choose File"}
              </Button>
            </Label>
            {registration && <p className="text-sm text-green-600 mt-2">{registration.name}</p>}
          </div>

          {/* Vehicle Photos */}
          <div className="border border-dashed rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="mb-4">
              <Upload className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-1">Vehicle Photos</h3>
            <p className="text-sm text-gray-500 mb-4 text-center">Upload 4-6 high-quality photos of your vehicle</p>

            <input
              type="file"
              id="vehiclePhotos"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e) => handleFileChange(e, "vehiclePhotos")}
            />
            <Label htmlFor="vehiclePhotos" className="cursor-pointer">
              <Button
                type="button"
                variant="outline"
                className={vehiclePhotos.length > 0 ? "bg-green-50 text-green-600 border-green-200" : ""}
              >
                {vehiclePhotos.length > 0 ? `${vehiclePhotos.length} Files Selected` : "Choose Files"}
              </Button>
            </Label>
            {vehiclePhotos.length > 0 && (
              <p className="text-sm text-green-600 mt-2">{vehiclePhotos.length} photos selected</p>
            )}
          </div>
        </div>

        {/* Preview section for vehicle photos */}
        {vehiclePhotos.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Vehicle Photo Previews</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {vehiclePhotos.map((photo, index) => (
                <div key={index} className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                  <img
                    src={photo.preview || "/placeholder.svg"}
                    alt={`Vehicle photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Agreements */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked === true)} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I agree to the{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Terms and Conditions
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="background"
              checked={agreeBackground}
              onCheckedChange={(checked) => setAgreeBackground(checked === true)}
            />
            <label
              htmlFor="background"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I consent to a background check and vehicle inspection
            </label>
          </div>
        </div>

        {/* Upload progress */}
        {isSubmitting && !showSuccessMessage && (
          <div className="mb-6">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-center mt-2">Uploading documents... {uploadProgress}%</p>
          </div>
        )}

        {/* Success message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-600 font-medium">Documents uploaded successfully!</p>
            <p className="text-sm text-green-500">Your application is being processed.</p>
          </div>
        )}

        {/* Form actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={onBack} disabled={isSubmitting}>
            Back
          </Button>
          <Button type="submit" className="flex-1" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </div>
  )
}
