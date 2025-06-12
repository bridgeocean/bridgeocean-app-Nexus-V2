"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"

export default function DebugEnvPage() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  const checkUrl = (url: string | undefined) => {
    if (!url) return { status: "missing", message: "Not set" }
    if (url.includes("placeholder")) return { status: "invalid", message: "Contains placeholder" }
    if (!url.includes("supabase.co")) return { status: "invalid", message: "Not a Supabase URL" }
    try {
      new URL(url)
      return { status: "valid", message: "Valid URL" }
    } catch {
      return { status: "invalid", message: "Invalid URL format" }
    }
  }

  const checkKey = (key: string | undefined) => {
    if (!key) return { status: "missing", message: "Not set" }
    if (key.includes("placeholder")) return { status: "invalid", message: "Contains placeholder" }
    if (key.length < 20) return { status: "invalid", message: "Too short" }
    if (!key.startsWith("eyJ")) return { status: "invalid", message: "Invalid JWT format" }
    return { status: "valid", message: "Valid key" }
  }

  const urlCheck = checkUrl(envVars.NEXT_PUBLIC_SUPABASE_URL)
  const keyCheck = checkKey(envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY)

  const getIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "invalid":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "missing":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "valid":
        return "default"
      case "invalid":
        return "destructive"
      case "missing":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Environment Variables Debug</h1>
        <p className="text-muted-foreground">Check your Supabase configuration</p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getIcon(urlCheck.status)}
              NEXT_PUBLIC_SUPABASE_URL
            </CardTitle>
            <CardDescription>Your Supabase project URL</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant={getBadgeVariant(urlCheck.status)}>
                {urlCheck.status.toUpperCase()}: {urlCheck.message}
              </Badge>
              <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                {envVars.NEXT_PUBLIC_SUPABASE_URL
                  ? `${envVars.NEXT_PUBLIC_SUPABASE_URL.substring(0, 50)}...`
                  : "Not set"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getIcon(keyCheck.status)}
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </CardTitle>
            <CardDescription>Your Supabase anonymous key</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge variant={getBadgeVariant(keyCheck.status)}>
                {keyCheck.status.toUpperCase()}: {keyCheck.message}
              </Badge>
              <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                {envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY
                  ? `${envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20)}...`
                  : "Not set"}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall Status</CardTitle>
          </CardHeader>
          <CardContent>
            {urlCheck.status === "valid" && keyCheck.status === "valid" ? (
              <Badge variant="default" className="text-lg px-4 py-2">
                <CheckCircle className="h-4 w-4 mr-2" />
                Supabase Configured Correctly
              </Badge>
            ) : (
              <Badge variant="destructive" className="text-lg px-4 py-2">
                <XCircle className="h-4 w-4 mr-2" />
                Supabase Configuration Issues
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
