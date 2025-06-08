import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, MessageSquare, UserPlus, Users } from "lucide-react"
import { CandidateTable } from "./components/candidate-table"
import { UpcomingMeetings } from "./components/upcoming-meetings"
import { RecentActivity } from "./components/recent-activity"
import { Overview } from "./components/overview"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard/candidates/new">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add Candidate
              </Button>
            </Link>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">245</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Interviews</CardTitle>
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">18</div>
                  <p className="text-xs text-muted-foreground">+2 scheduled today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Onboarding Rate</CardTitle>
                  <UserPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">64%</div>
                  <p className="text-xs text-muted-foreground">+6% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+3 in the last hour</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Overview />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions in the onboarding process</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentActivity />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="candidates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Candidates</CardTitle>
                <CardDescription>Manage and track all driver candidates in your pipeline</CardDescription>
              </CardHeader>
              <CardContent>
                <CandidateTable />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="meetings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Meetings</CardTitle>
                <CardDescription>View and prepare for scheduled interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingMeetings />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="communications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Communication Channels</CardTitle>
                <CardDescription>Manage WhatsApp and email communications</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">WhatsApp</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Manage WhatsApp communications with driver candidates
                      </p>
                      <Link href="/communications/whatsapp">
                        <Button>Open WhatsApp Dashboard</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Email</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">Send and manage emails with attachments</p>
                      <Link href="/communications/email">
                        <Button>Compose Email</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
