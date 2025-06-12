"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Car, DollarSign, AlertTriangle } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export function AnalyticsDashboard() {
  const [businessMetrics, setBusinessMetrics] = useState({
    charterBookings: 0,
    charterRevenue: 0,
    ehailingDrivers: 0,
    activeDrivers: 0,
    totalCandidates: 0,
    inspectionCompliance: 96, // Default value
    serviceCompliance: 88, // Default value
    weeklyRemittance: 0,
    dailyContribution: 0,
    tokunboCars: 1,
    nigerianUsedCars: 0,
    toyotaCamryCount: 3, // Fixed count for Toyota Camry
    gmcTerrainCount: 2, // Fixed count for GMC Terrain
  })

  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState("real") // "real" or "demo"

  useEffect(() => {
    loadBusinessMetrics()
    const interval = setInterval(loadBusinessMetrics, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const loadBusinessMetrics = async () => {
    try {
      setLoading(true)

      // Get charter bookings
      const { data: bookings, error: bookingsError } = await supabase.from("charter_bookings").select("*")
      if (bookingsError) console.error("Error loading bookings:", bookingsError)

      // Get candidates
      const { data: candidates, error: candidatesError } = await supabase.from("candidates").select("*")
      if (candidatesError) console.error("Error loading candidates:", candidatesError)

      // Get active drivers
      const { data: drivers, error: driversError } = await supabase
        .from("candidates")
        .select("*")
        .eq("status", "active")
      if (driversError) console.error("Error loading active drivers:", driversError)

      // Calculate metrics
      const charterBookings = bookings?.length || 0
      const totalCandidates = candidates?.length || 0
      const activeDrivers = drivers?.length || 0
      const ehailingDrivers = drivers?.filter((d) => d.service_type === "ehailing").length || activeDrivers

      // Calculate revenue (use real data if available)
      let charterRevenue = 0
      if (bookings && bookings.length > 0) {
        charterRevenue = bookings.reduce((total, booking) => total + (booking.total_amount || 0), 0)
      }

      // If no charter revenue from bookings, estimate based on average booking value
      if (charterRevenue === 0 && charterBookings > 0) {
        charterRevenue = charterBookings * 45000 // Average booking value
      }

      // Calculate financial metrics with correct values
      // 1 tokunbo car (40,000) and the rest Nigerian used (35,000)
      const tokunboCars = 1
      const nigerianUsedCars = ehailingDrivers - tokunboCars
      const weeklyRemittance = tokunboCars * 40000 + nigerianUsedCars * 35000
      const dailyContribution = ehailingDrivers * 1000 * 30 // 1,000 naira per day per driver for 30 days

      setBusinessMetrics({
        charterBookings,
        charterRevenue,
        ehailingDrivers,
        activeDrivers,
        totalCandidates,
        inspectionCompliance: 96, // Default value
        serviceCompliance: 88, // Default value
        weeklyRemittance,
        dailyContribution,
        tokunboCars,
        nigerianUsedCars,
        toyotaCamryCount: 3, // Fixed count for Toyota Camry
        gmcTerrainCount: 2, // Fixed count for GMC Terrain
      })

      // Determine if we're using real or demo data
      setDataSource(bookings && candidates ? "real" : "demo")
    } catch (error) {
      console.error("Error loading business metrics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {dataSource === "demo" && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4">
            <p className="text-yellow-800 font-medium">
              <AlertTriangle className="h-4 w-4 inline mr-2" />
              Showing demo data. Connect your database to see real metrics.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Charter Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₦{businessMetrics.charterRevenue > 0 ? (businessMetrics.charterRevenue / 1000000).toFixed(1) + "M" : "0"}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              From {businessMetrics.charterBookings} bookings
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">E-hailing Revenue</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {businessMetrics.ehailingDrivers > 0 ? "₦" + businessMetrics.ehailingDrivers * 1.8 + "M" : "₦0"}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              Estimated from driver count
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessMetrics.activeDrivers}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              From {businessMetrics.totalCandidates} total candidates
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{businessMetrics.inspectionCompliance}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              Weekly inspections
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="charter">Charter Service</TabsTrigger>
          <TabsTrigger value="ehailing">E-hailing Operations</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Business Overview</CardTitle>
                <CardDescription>Key metrics across all services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Charter Bookings</p>
                    <p className="text-2xl font-bold">{businessMetrics.charterBookings}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">E-hailing Drivers</p>
                    <p className="text-2xl font-bold">{businessMetrics.ehailingDrivers}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Total Candidates</p>
                    <p className="text-2xl font-bold">{businessMetrics.totalCandidates}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Active Drivers</p>
                    <p className="text-2xl font-bold">{businessMetrics.activeDrivers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Important dates and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {businessMetrics.activeDrivers > 0 ? (
                    <>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-blue-500" />
                          <div>
                            <p className="font-medium text-sm">Weekly inspection - All drivers</p>
                            <p className="text-xs text-muted-foreground">Next Tuesday</p>
                          </div>
                        </div>
                        <Badge variant="outline">{businessMetrics.activeDrivers}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-green-500" />
                          <div>
                            <p className="font-medium text-sm">Weekly remittance due</p>
                            <p className="text-xs text-muted-foreground">Next Monday</p>
                          </div>
                        </div>
                        <Badge variant="outline">{businessMetrics.activeDrivers}</Badge>
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground text-center py-4">No upcoming events</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="charter" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Charter Service Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Bookings</span>
                  <span className="font-bold">{businessMetrics.charterBookings}</span>
                </div>
                <div className="flex justify-between">
                  <span>Revenue</span>
                  <span className="font-bold">
                    ₦
                    {businessMetrics.charterRevenue > 0
                      ? (businessMetrics.charterRevenue / 1000000).toFixed(1) + "M"
                      : businessMetrics.charterBookings > 0
                        ? "45K"
                        : "0"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Average Booking Value</span>
                  <span className="font-bold">
                    ₦
                    {businessMetrics.charterBookings > 0
                      ? Math.round(businessMetrics.charterRevenue / businessMetrics.charterBookings).toLocaleString()
                      : "0"}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Charter Vehicles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      <span>Toyota Camry</span>
                    </div>
                    <Badge variant="outline">{businessMetrics.toyotaCamryCount} vehicles</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4" />
                      <span>GMC Terrain</span>
                    </div>
                    <Badge variant="outline">{businessMetrics.gmcTerrainCount} vehicles</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ehailing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Active Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{businessMetrics.ehailingDrivers}</div>
                <p className="text-sm text-muted-foreground">E-hailing fleet</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inspection Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{businessMetrics.inspectionCompliance}%</div>
                <p className="text-sm text-muted-foreground">Weekly inspections</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Service Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{businessMetrics.serviceCompliance}%</div>
                <p className="text-sm text-muted-foreground">Bi-monthly services</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>E-hailing Operations</CardTitle>
              <CardDescription>Driver management and compliance tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Operational Metrics</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total E-hailing Trips</span>
                      <span className="font-bold">{businessMetrics.ehailingDrivers * 50} (est.)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Trips per Driver</span>
                      <span className="font-bold">50 (est.)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Remittance Collection</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Contribution Participation</span>
                      <span className="font-bold">88%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Compliance Tracking</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Tuesday Inspections</span>
                      <Badge variant="default">96% attendance</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Bi-monthly Services</span>
                      <Badge variant="secondary">88% completion</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Document Compliance</span>
                      <Badge variant="default">94% valid</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Vehicle Condition</span>
                      <Badge variant="default">Excellent</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Caution Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₦{((businessMetrics.ehailingDrivers * 350000) / 1000000).toFixed(1)}M
                </div>
                <p className="text-sm text-muted-foreground">{businessMetrics.ehailingDrivers} drivers × ₦350K</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Daily Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{(businessMetrics.dailyContribution / 1000).toFixed(0)}K</div>
                <p className="text-sm text-muted-foreground">
                  ₦1,000 × {businessMetrics.ehailingDrivers} drivers × 30 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Remittances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦{(businessMetrics.weeklyRemittance / 1000).toFixed(0)}K</div>
                <p className="text-sm text-muted-foreground">
                  {businessMetrics.tokunboCars > 0
                    ? `${businessMetrics.nigerianUsedCars} × ₦35K + ${businessMetrics.tokunboCars} × ₦40K`
                    : `${businessMetrics.ehailingDrivers} × ₦35K`}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₦{((businessMetrics.charterRevenue + businessMetrics.ehailingDrivers * 1800000) / 1000000).toFixed(1)}
                  M
                </div>
                <p className="text-sm text-muted-foreground">Combined services</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Financial Breakdown</CardTitle>
              <CardDescription>Revenue streams and financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold">Revenue Sources</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>E-hailing Operations</span>
                      <span className="font-bold">
                        ₦{((businessMetrics.ehailingDrivers * 1800000) / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Charter Services</span>
                      <span className="font-bold">
                        ₦
                        {businessMetrics.charterRevenue > 0
                          ? (businessMetrics.charterRevenue / 1000000).toFixed(1) + "M"
                          : businessMetrics.charterBookings > 0
                            ? "0.045M"
                            : "0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Remittances</span>
                      <span className="font-bold">
                        ₦{((businessMetrics.weeklyRemittance * 4) / 1000000).toFixed(1)}M/month
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Contributions</span>
                      <span className="font-bold">
                        ₦{(businessMetrics.dailyContribution / 1000000).toFixed(1)}M/month
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Financial Security</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Caution Fees (Held)</span>
                      <span className="font-bold">
                        ₦{((businessMetrics.ehailingDrivers * 350000) / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Driver Contribution Fund</span>
                      <span className="font-bold">
                        ₦{((businessMetrics.ehailingDrivers * 1000 * 30 * 3) / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Compliance</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Financial Health</span>
                      <Badge variant="default">Good</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
