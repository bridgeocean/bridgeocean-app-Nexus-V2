"use client"

import { useState, useEffect } from "react"
import { supabase, isSupabaseConfigured } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export function SupabaseDebugClient() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [configured, setConfigured] = useState(false)
  const [candidates, setCandidates] = useState<any[]>([])
  const [envVars, setEnvVars] = useState({
    url: "",
    anonKey: "",
    serviceKey: "Not checking for security reasons",
  })

  useEffect(() => {
    checkSupabase()
  }, [])

  const checkSupabase = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check if Supabase is configured
      const isConfigured = Boolean(isSupabaseConfigured())
      setConfigured(isConfigured)

      // Get environment variables (partial for security)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "Not set"
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "Not set"

      setEnvVars({
        url: supabaseUrl.substring(0, 15) + "..." + supabaseUrl.substring(supabaseUrl.length - 10),
        anonKey: supabaseAnonKey.substring(0, 5) + "..." + supabaseAnonKey.substring(supabaseAnonKey.length - 5),
        serviceKey: "Not checking for security reasons",
      })

      // Try to fetch candidates
      if (isConfigured) {
        const { data, error } = await supabase.from("candidates").select("*")

        if (error) {
          throw new Error(`Database query failed: ${error.message}`)
        }

        setCandidates(data || [])
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></div>
              <span>Checking configuration...</span>
            </div>
          ) : configured ? (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">Supabase is properly configured!</AlertDescription>
            </Alert>
          ) : (
            <Alert className="bg-amber-50 border-amber-200">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-600">
                Supabase is not configured correctly. Check your environment variables.
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-4 space-y-2">
            <div>
              <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL:</span> {envVars.url}
            </div>
            <div>
              <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span> {envVars.anonKey}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Candidates Table</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary mr-2"></div>
              <span>Loading candidates...</span>
            </div>
          ) : error ? (
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-600">Error: {error}</AlertDescription>
            </Alert>
          ) : candidates.length > 0 ? (
            <div>
              <p className="mb-2">Found {candidates.length} candidates:</p>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {candidates.map((candidate) => (
                      <tr key={candidate.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {candidate.id.substring(0, 8)}...
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {candidate.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{candidate.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No candidates found in the database.</p>
          )}

          <Button onClick={checkSupabase} disabled={loading} className="mt-4">
            {loading ? "Checking..." : "Refresh Check"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
