"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface FileWithPreview extends File {
  preview?: string
}

interface DocumentUploadProps {
  onBack: () => void
  onComplete: (documents: Record<string, string>) => void
  partnerId?: string
}

export default function DocumentUploadWithValidation({ onBack, onComplete, partnerId }: DocumentUploadProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, string>>({})

  // File states
  const [identification, setIdentification] = useState<FileWithPreview | null>(null)
  const [insurance, setInsurance] = useState<FileWithPreview | null>(null)
  const [registration, setRegistration] = useState<FileWithPreview | null>(null)
  const [vehiclePhotos, setVehiclePhotos] = useState<FileWithPreview[]>([])

  // Upload status
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({})

  // Agreement states
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeBackground, setAgreeBackground] = useState(false)

  // Handle file selection
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<FileWithPreview | null>>,
    documentType: string,
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Client-side validation
      if (!validateFileType(file, documentType)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or image file (JPG, PNG)",
          variant: "destructive",
        })
        return
      }

      if (!validateFileSize(file, documentType)) {
        toast({
          title: "File too large",
          description:
            documentType === "vehiclePhotos" ? "Vehicle photos must be under 5MB" : "Documents must be under 10MB",
          variant: "destructive",
        })
        return
      }

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
      setFile(fileWithPreview)

      // Reset upload status for this document
      setUploadStatus((prev) => ({ ...prev, [documentType]: "" }))
    }
  }

  // Handle multiple file selection
  const handleMultipleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)

      // Client-side validation for each file
      const validFiles = files.filter((file) => {
        if (!validateFileType(file, "vehiclePhotos")) {
          toast({
            title: "Invalid file type",
            description: `"${file.name}" is not a valid image file`,
            variant: "destructive",
          })
          return false
        }

        if (!validateFileSize(file, "vehiclePhotos")) {
          toast({
            title: "File too large",
            description: `"${file.name}" exceeds the 5MB size limit`,
            variant: "destructive",
          })
          return false
        }

        return true
      })

      const filesArray = validFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      )

      setVehiclePhotos(filesArray)

      // Reset upload status
      setUploadStatus((prev) => ({ ...prev, vehiclePhotos: "" }))
    }
  }

  // Client-side validation functions
  const validateFileType = (file: File, documentType: string): boolean => {
    if (documentType === "vehiclePhotos") {
      return ["image/jpeg", "image/png", "image/webp"].includes(file.type)
    } else {
      return ["application/pdf", "image/jpeg", "image/png"].includes(file.type)
    }
  }

  const validateFileSize = (file: File, documentType: string): boolean => {
    if (documentType === "vehiclePhotos") {
      return file.size <= 5 * 1024 * 1024 // 5MB
    } else {
      return file.size <= 10 * 1024 * 1024 // 10MB
    }
  }

  // Upload a single file
  const uploadFile = async (file: File, documentType: string): Promise<string> => {
    try {
      setUploadStatus((prev) => ({ ...prev, [documentType]: "uploading" }))

      const formData = new FormData()
      formData.append("file", file)
      formData.append("documentType", documentType)
      if (partnerId) formData.append("partnerId", partnerId)

      const response = await fetch("/api/document-upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const data = await response.json()

      setUploadStatus((prev) => ({ ...prev, [documentType]: "success" }))
      return data.fileUrl
    } catch (error) {
      console.error(`Error uploading ${documentType}:`, error)
      setUploadStatus((prev) => ({ ...prev, [documentType]: "error" }))
      throw error
    }
  }

  // Upload all files
  const uploadAllFiles = async () => {
    try {
      setIsSubmitting(true)
      setUploadProgress(0)

      const totalUploads = 1 + 1 + 1 + vehiclePhotos.length
      let completedUploads = 0
      const documents: Record<string, string> = {}

      // Upload identification
      if (identification) {
        documents.identification = await uploadFile(identification, "identification")
        completedUploads++
        setUploadProgress(Math.round((completedUploads / totalUploads) * 100))
      }

      // Upload insurance
      if (insurance) {
        documents.insurance = await uploadFile(insurance, "insurance")
        completedUploads++
        setUploadProgress(Math.round((completedUploads / totalUploads) * 100))
      }

      // Upload registration
      if (registration) {
        documents.registration = await uploadFile(registration, "registration")
        completedUploads++
        setUploadProgress(Math.round((completedUploads / totalUploads) * 100))
      }

      // Upload vehicle photos
      if (vehiclePhotos.length > 0) {
        const photoUrls: string[] = []

        for (const photo of vehiclePhotos) {
          const url = await uploadFile(photo, "vehiclePhotos")
          photoUrls.push(url)
          completedUploads++
          setUploadProgress(Math.round((completedUploads / totalUploads) * 100))
        }

        documents.vehiclePhotos = JSON.stringify(photoUrls)
      }

      setUploadedDocuments(documents)
      return documents
    } catch (error) {
      console.error("Error uploading files:", error)
      toast({
        title: "Upload failed",
        description: "There was an error uploading your documents. Please try again.",
        variant: "destructive",
      })
      throw error
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!identification || !insurance || !registration || vehiclePhotos.length === 0) {
      toast({
        title: "Missing documents",
        description: "Please upload all required documents",
        variant: "destructive",
      })
      return
    }

    if (!agreeTerms || !agreeBackground) {
      toast({
        title: "Agreement required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      })
      return
    }

    try {
      // Upload all files
      const documents = await uploadAllFiles()

      // Show success message
      toast({
        title: "Documents uploaded successfully",
        description: "Your application is being processed",
        variant: "default",
      })

      // Complete the process
      setTimeout(() => {
        onComplete(documents)
      }, 1000)
    } catch (error) {
      console.error("Submission error:", error)
    }
  }

  // Get status icon/text for a document
  const getStatusIndicator = (documentType: string) => {
    const status = uploadStatus[documentType]

    if (status === "uploading") return <span className="text-amber-500 text-xs">Uploading...</span>
    if (status === "success") return <span className="text-green-500 text-xs">Uploaded ✓</span>
    if (status === "error") return <span className="text-red-500 text-xs">Failed ✗</span>
    return null
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
              accept="image/jpeg,image/png,application/pdf"
              onChange={(e) => handleFileChange(e, setIdentification, "identification")}
              disabled={isSubmitting}
            />
            <Label htmlFor="identification" className="cursor-pointer">
              <Button
                type="button"
                variant="outline"
                className={identification ? "bg-green-50 text-green-600 border-green-200" : ""}
                disabled={isSubmitting}
              >
                {identification ? "File Selected" : "Choose File"}
              </Button>
            </Label>
            {identification && (
              <div className="text-sm mt-2 flex items-center">
                <span className="text-green-600 truncate max-w-[150px]">{identification.name}</span>
                {getStatusIndicator("identification")}
              </div>
            )}
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
              accept="image/jpeg,image/png,application/pdf"
              onChange={(e) => handleFileChange(e, setInsurance, "insurance")}
              disabled={isSubmitting}
            />
            <Label htmlFor="insurance" className="cursor-pointer">
              <Button
                type="button"
                variant="outline"
                className={insurance ? "bg-green-50 text-green-600 border-green-200" : ""}
                disabled={isSubmitting}
              >
                {insurance ? "File Selected" : "Choose File"}
              </Button>
            </Label>
            {insurance && (
              <div className="text-sm mt-2 flex items-center">
                <span className="text-green-600 truncate max-w-[150px]">{insurance.name}</span>
                {getStatusIndicator("insurance")}
              </div>
            )}
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
              accept="image/jpeg,image/png,application/pdf"
              onChange={(e) => handleFileChange(e, setRegistration, "registration")}
              disabled={isSubmitting}
            />
            <Label htmlFor="registration" className="cursor-pointer">
              <Button
                type="button"
                variant="outline"
                className={registration ? "bg-green-50 text-green-600 border-green-200" : ""}
                disabled={isSubmitting}
              >
                {registration ? "File Selected" : "Choose File"}
              </Button>
            </Label>
            {registration && (
              <div className="text-sm mt-2 flex items-center">
                <span className="text-green-600 truncate max-w-[150px]">{registration.name}</span>
                {getStatusIndicator("registration")}
              </div>
            )}
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
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleMultipleFileChange}
              disabled={isSubmitting}
            />
            <Label htmlFor="vehiclePhotos" className="cursor-pointer">
              <Button
                type="button"
                variant="outline"
                className={vehiclePhotos.length > 0 ? "bg-green-50 text-green-600 border-green-200" : ""}
                disabled={isSubmitting}
              >
                {vehiclePhotos.length > 0 ? `${vehiclePhotos.length} Files Selected` : "Choose Files"}
              </Button>
            </Label>
            {vehiclePhotos.length > 0 && (
              <div className="text-sm mt-2 flex items-center">
                <span className="text-green-600">{vehiclePhotos.length} photos selected</span>
                {getStatusIndicator("vehiclePhotos")}
              </div>
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

        {/* File type requirements */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium mb-2 text-blue-700">File Requirements</h3>
          <ul className="text-xs text-blue-600 space-y-1">
            <li>• Documents: PDF, JPG, or PNG format (max 10MB)</li>
            <li>• Vehicle Photos: JPG, PNG, or WebP format (max 5MB each)</li>
            <li>• All documents must be clear and legible</li>
            <li>• Vehicle photos should show exterior and interior clearly</li>
          </ul>
        </div>

        {/* Agreements */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              disabled={isSubmitting}
            />
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
              disabled={isSubmitting}
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
        {isSubmitting && (
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
