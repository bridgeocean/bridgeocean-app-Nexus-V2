import { MainNav } from "@/components/main-nav"
import { WhatsAppConnect } from "@/components/integrations/whatsapp-connect"
import { CalendarConnect } from "@/components/integrations/calendar-connect"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, FileText, Settings } from "lucide-react"

export default function IntegrationsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <WhatsAppConnect />
          <CalendarConnect />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Google Drive Integration
              </CardTitle>
              <CardDescription>Connect your Google Drive for document storage and sharing</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Connect Google Drive</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Templates
              </CardTitle>
              <CardDescription>Sync contract templates and forms from your Drive</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Sync Templates
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                API Settings
              </CardTitle>
              <CardDescription>Configure API keys and webhook endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Configure APIs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
