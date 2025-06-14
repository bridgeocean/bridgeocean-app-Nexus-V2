import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailAutomation } from "@/components/admin/email-automation"
import { CalendarIntegration } from "@/components/admin/calendar-integration"
import { Mail, Calendar, Bot, MessageSquare, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Complete Bridgeocean Admin Suite</h2>
        </div>

        <Tabs defaultValue="email" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Tools
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <EmailAutomation />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <CalendarIntegration />
          </TabsContent>
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Advanced Features (Coming Soon)
            </CardTitle>
            <CardDescription>
              AI Assistant, WhatsApp Integration, and Analytics Dashboard will be available after core deployment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 border rounded-lg opacity-50">
                <Bot className="h-8 w-8 mb-2" />
                <h3 className="font-semibold">AI Assistant</h3>
                <p className="text-sm text-muted-foreground">Enhanced AI capabilities</p>
              </div>
              <div className="p-4 border rounded-lg opacity-50">
                <MessageSquare className="h-8 w-8 mb-2" />
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">Advanced messaging features</p>
              </div>
              <div className="p-4 border rounded-lg opacity-50">
                <BarChart3 className="h-8 w-8 mb-2" />
                <h3 className="font-semibold">Analytics</h3>
                <p className="text-sm text-muted-foreground">Business insights dashboard</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
