import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseServiceKey)

// File type validation
const ALLOWED_FILE_TYPES = {
  image: ["image/jpeg", "image/png", "image/webp"],
  document: ["application/pdf", "image/jpeg", "image/png"],
}

// File size limits in bytes
const MAX_FILE_SIZES = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
}

export async function POST(request: NextRequest) {
  try {
    // Get the form data
    const formData = await request.formData()

    // Get the partner ID (you should generate this or get it from auth)
    const partnerId = (formData.get("partnerId") as string) || `partner_${Date.now()}`

    // Get document type
    const documentType = formData.get("documentType") as string
    if (!documentType) {
      return NextResponse.json({ error: "Document type is required" }, { status: 400 })
    }

    // Get the file
    const file = formData.get("file") as File
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const validTypes = documentType === "vehiclePhotos" ? ALLOWED_FILE_TYPES.image : ALLOWED_FILE_TYPES.document

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type. Allowed types: ${validTypes.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Validate file size
    const maxSize = documentType === "vehiclePhotos" ? MAX_FILE_SIZES.image : MAX_FILE_SIZES.document

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          error: `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB`,
        },
        { status: 400 },
      )
    }

    // Generate a unique filename
    const fileExtension = file.name.split(".").pop()
    const fileName = `${partnerId}/${documentType}_${Date.now()}.${fileExtension}`

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from("partner-documents").upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    })

    if (error) {
      console.error("Supabase storage error:", error)
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }

    // Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("partner-documents").getPublicUrl(fileName)

    // Return success with file info
    return NextResponse.json({
      success: true,
      fileUrl: publicUrl,
      fileName: fileName,
      documentType,
    })
  } catch (error) {
    console.error("Server error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
