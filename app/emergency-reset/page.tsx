"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function EmergencyResetPage() {
  const router = useRouter()

  const handleReset = () => {
    // Clear all authentication data
    localStorage.clear()
    sessionStorage.clear()

    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      const eqPos = c.indexOf("=")
      const name = eqPos > -1 ? c.substr(0, eqPos) : c
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"
    })

    alert("All authentication data cleared! You can now try logging in again.")
    router.push("/signin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Emergency Reset</CardTitle>
          <CardDescription className="text-center">Clear all authentication data and start fresh</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>This will:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Clear all stored login data</li>
              <li>Reset authentication state</li>
              <li>Allow you to log in fresh</li>
            </ul>
          </div>
          <Button onClick={handleReset} className="w-full" variant="destructive">
            Reset Everything
          </Button>
          <Button onClick={() => router.push("/signin")} className="w-full" variant="outline">
            Back to Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
