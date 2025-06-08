import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, MessageSquare, UserPlus, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar, CheckCircle, MessageCircle } from "lucide-react"

export default function DriverPrepPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Smart Meeting Preparation for Driver Onboarding
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Streamline your e-hailing driver recruitment process with AI-powered meeting preparation and
                    integrated communication tools.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline">
                      Book a Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full">
                  <Image
                    src="/images/driver-meeting.jpg"
                    alt="Professional Driver Management"
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Comprehensive Driver Management
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Everything you need to manage your driver recruitment and onboarding process
                </p>
              </div>
            </div>

            <Tabs defaultValue="overview" className="space-y-8">
              <div className="flex justify-center">
                <TabsList className="grid w-full max-w-md grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="candidates">Candidates</TabsTrigger>
                  <TabsTrigger value="meetings">Meetings</TabsTrigger>
                  <TabsTrigger value="comms">Communications</TabsTrigger>
                </TabsList>
              </div>

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
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Latest actions in the onboarding process</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] overflow-auto">
                      <div className="space-y-8">
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium text-primary">JD</span>
                          </div>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">John Doe moved to Interview stage</p>
                            <p className="text-sm text-muted-foreground">Interview scheduled for June 8, 2025</p>
                          </div>
                          <div className="ml-auto font-medium text-xs text-muted-foreground">Just now</div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium text-primary">SD</span>
                          </div>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Sarah Davis completed document submission
                            </p>
                            <p className="text-sm text-muted-foreground">All required documents received</p>
                          </div>
                          <div className="ml-auto font-medium text-xs text-muted-foreground">2 hours ago</div>
                        </div>
                        <div className="flex items-center">
                          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="font-medium text-primary">RJ</span>
                          </div>
                          <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">Robert Johnson passed screening</p>
                            <p className="text-sm text-muted-foreground">Ready for selection stage</p>
                          </div>
                          <div className="ml-auto font-medium text-xs text-muted-foreground">5 hours ago</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Meetings</CardTitle>
                      <CardDescription>View and prepare for scheduled interviews</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] overflow-auto">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-4 rounded-md border p-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">Interview with John Doe</p>
                              <span className="text-xs text-muted-foreground">Today, 2:00 PM</span>
                            </div>
                            <p className="text-xs text-muted-foreground">30 minutes, Video Call</p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline" className="h-7 text-xs">
                                Prepare
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 text-xs">
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-4 rounded-md border p-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Calendar className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium">Interview with Michael Smith</p>
                              <span className="text-xs text-muted-foreground">Today, 4:30 PM</span>
                            </div>
                            <p className="text-xs text-muted-foreground">45 minutes, Video Call</p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" variant="outline" className="h-7 text-xs">
                                Prepare
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 text-xs">
                                Message
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="candidates">
                <Card>
                  <CardHeader>
                    <CardTitle>Candidate Pipeline</CardTitle>
                    <CardDescription>Track candidates through your recruitment process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Name</th>
                            <th className="text-left p-2">Email</th>
                            <th className="text-left p-2">Stage</th>
                            <th className="text-left p-2">Status</th>
                            <th className="text-left p-2">Last Contact</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">John Doe</td>
                            <td className="p-2">john.doe@example.com</td>
                            <td className="p-2">
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-purple-500 text-purple-500">
                                Interview
                              </span>
                            </td>
                            <td className="p-2">
                              <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-500">
                                Active
                              </span>
                            </td>
                            <td className="p-2">2025-06-07</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Sarah Davis</td>
                            <td className="p-2">sarah.davis@example.com</td>
                            <td className="p-2">
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-amber-500 text-amber-500">
                                Selection
                              </span>
                            </td>
                            <td className="p-2">
                              <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-500">
                                Active
                              </span>
                            </td>
                            <td className="p-2">2025-06-06</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Robert Johnson</td>
                            <td className="p-2">robert.johnson@example.com</td>
                            <td className="p-2">
                              <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold border-blue-500 text-blue-500">
                                Screening
                              </span>
                            </td>
                            <td className="p-2">
                              <span className="inline-flex items-center rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-500">
                                Active
                              </span>
                            </td>
                            <td className="p-2">2025-06-07</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="flex justify-center mt-4">
                      <Button>View All Candidates</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="meetings">
                <Card>
                  <CardHeader>
                    <CardTitle>Calendar View</CardTitle>
                    <CardDescription>Manage your interview schedule</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="md:col-span-1">
                        <div className="rounded-md border p-4">
                          <div className="grid grid-cols-7 gap-2 text-center text-xs font-medium">
                            <div>Su</div>
                            <div>Mo</div>
                            <div>Tu</div>
                            <div>We</div>
                            <div>Th</div>
                            <div>Fr</div>
                            <div>Sa</div>
                          </div>
                          <div className="mt-2 grid grid-cols-7 gap-2 text-center text-sm">
                            {Array.from({ length: 35 }).map((_, i) => {
                              const day = i - 2
                              const isToday = day === 8
                              const hasEvent = [8, 9, 15].includes(day)
                              return (
                                <div
                                  key={i}
                                  className={`aspect-square flex items-center justify-center rounded-md ${
                                    day < 1 || day > 30
                                      ? "text-muted-foreground/30"
                                      : isToday
                                        ? "bg-primary text-primary-foreground"
                                        : hasEvent
                                          ? "bg-primary/10 text-primary"
                                          : "hover:bg-muted"
                                  }`}
                                >
                                  {day > 0 && day <= 30 ? day : ""}
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="space-y-4">
                          <div className="rounded-md border p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">Today's Schedule</h3>
                                <p className="text-sm text-muted-foreground">June 8, 2025</p>
                              </div>
                              <Button size="sm">+ Add Meeting</Button>
                            </div>
                            <div className="mt-4 space-y-2">
                              <div className="flex items-center space-x-4 rounded-md bg-muted p-3">
                                <div className="flex-none text-center">
                                  <div className="text-xs font-medium">2:00 PM</div>
                                  <div className="text-xs text-muted-foreground">30 min</div>
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium">Interview with John Doe</div>
                                  <div className="text-xs text-muted-foreground">Video Call</div>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="h-7 text-xs">
                                    Join
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-7 text-xs">
                                    Prepare
                                  </Button>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 rounded-md p-3">
                                <div className="flex-none text-center">
                                  <div className="text-xs font-medium">4:30 PM</div>
                                  <div className="text-xs text-muted-foreground">45 min</div>
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium">Interview with Michael Smith</div>
                                  <div className="text-xs text-muted-foreground">Video Call</div>
                                </div>
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline" className="h-7 text-xs">
                                    Join
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-7 text-xs">
                                    Prepare
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comms">
                <Card>
                  <CardHeader>
                    <CardTitle>Communication Channels</CardTitle>
                    <CardDescription>Manage WhatsApp and email communications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">WhatsApp</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            Manage WhatsApp communications with driver candidates
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Connected Account</p>
                              <p className="text-xs text-muted-foreground">+234 913 563 0154</p>
                            </div>
                            <Button>Open WhatsApp Dashboard</Button>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Email</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">Send and manage emails with attachments</p>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Connected Account</p>
                              <p className="text-xs text-muted-foreground">bridgeocean@cyberservices.com</p>
                            </div>
                            <Button>Compose Email</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-background">
                <div className="rounded-full border p-4 bg-background">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Screening</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Efficiently review and filter driver applications with AI assistance
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-background">
                <div className="rounded-full border p-4 bg-background">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Selection</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Identify and shortlist the most promising driver candidates
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-background">
                <div className="rounded-full border p-4 bg-background">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Interview</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Schedule and prepare for interviews with AI-generated materials
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-4 bg-background">
                <div className="rounded-full border p-4 bg-background">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Onboarding</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Streamline contract signing and key collection processes
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
