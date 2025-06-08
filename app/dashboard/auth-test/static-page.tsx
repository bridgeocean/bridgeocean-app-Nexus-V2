import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function StaticAuthTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>This page requires authentication. Please sign in to view it.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
