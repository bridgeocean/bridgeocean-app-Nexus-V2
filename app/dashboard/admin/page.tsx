import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmailAutomation } from "@/components/admin/email-automation"
import { CalendarIntegration } from "@/components/admin/calendar-integration"
import { EnhancedAI } from "@/components/admin/enhanced-ai"
import { AdvancedWhatsApp } from "@/components/admin/advanced-whatsapp"
import { AnalyticsDashboard } from "@/components/admin/analytics-dashboard"
import { Mail, Calendar, Bot, MessageSquare, BarChart3 } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Complete Bridgeocean Admin Suite</h2>
        </div>

        <Tabs defaultValue="analytics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Tools
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-4">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <EmailAutomation />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <CalendarIntegration />
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <EnhancedAI />
          </TabsContent>

          <TabsContent value="whatsapp" className="space-y-4">
            <AdvancedWhatsApp />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
