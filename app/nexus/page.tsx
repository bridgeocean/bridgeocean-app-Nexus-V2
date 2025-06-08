"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  Satellite,
  MapPin,
  Clock,
  Heart,
  Users,
  Shield,
  Zap,
  Navigation,
  Phone,
  Mail,
  Target,
  TrendingUp,
  Globe,
} from "lucide-react"

export default function NexusPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-red-600/20 to-red-800/20">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit border-red-500 text-red-500">
                    Satellite-Powered Technology
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Nexus Emergency Logistics
                  </h1>
                  <p className="text-xl text-muted-foreground mb-4">Satellite-Powered Emergency Coordination</p>
                  <p className="max-w-[600px] text-muted-foreground md:text-lg">
                    Coordinated emergency response platform leveraging AI intelligent coordination, routing engine, and
                    satellite-GPS powered technology to save lives in critical moments.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/contact">
                    <Button size="lg" className="gap-1.5 bg-red-600 hover:bg-red-700">
                      <Heart className="h-4 w-4" />
                      Learn More
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Partner With Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-800/20 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <Satellite className="h-24 w-24 text-red-500 mx-auto" />
                      <div className="space-y-2">
                        <h3 className="text-2xl font-bold">Emergency Response</h3>
                        <p className="text-muted-foreground">Satellite-Powered Coordination</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-red-600">The Problem</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                In Nigeria, medical emergencies become tragedies because of systemic delays
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-red-200">
                <CardHeader>
                  <MapPin className="h-12 w-12 text-red-500 mb-4" />
                  <CardTitle>Difficulty Identifying Facilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Patients struggle to quickly identify appropriate nearby medical facilities during emergencies.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <Clock className="h-12 w-12 text-red-500 mb-4" />
                  <CardTitle>Slow Ambulance Dispatch</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Uncoordinated and slow ambulance dispatch with inefficient navigation systems.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader>
                  <Users className="h-12 w-12 text-red-500 mb-4" />
                  <CardTitle>System Fragmentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Fragmentation between patient, transport, and hospital costing vital time and lives.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 text-center space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-4xl mx-auto">
                <p className="text-lg font-semibold text-red-800 mb-2">
                  The chances of survival for a trauma patient are significantly higher if they receive definitive care
                  within the first hour after injury.
                </p>
                <p className="text-red-600">
                  ~15 people die globally every minute due to lack of effective emergency medical response.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Solution</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Nexus Emergency Logistics - Coordinated Emergency Response Platform
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 mb-12">
              <Card>
                <CardHeader className="text-center">
                  <Zap className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <CardTitle>Speed</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Rapid response coordination reducing critical time delays</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <CardTitle>Reliability</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">Dependable satellite-powered systems for consistent service</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Navigation className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <CardTitle>Coordination</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Seamless integration between all emergency response stakeholders
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-background border rounded-lg p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Technology Stack</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center space-y-2">
                  <Satellite className="h-16 w-16 text-primary mx-auto" />
                  <h4 className="font-semibold">AI Intelligent Coordination</h4>
                  <p className="text-sm text-muted-foreground">Smart dispatch and resource allocation</p>
                </div>
                <div className="text-center space-y-2">
                  <MapPin className="h-16 w-16 text-primary mx-auto" />
                  <h4 className="font-semibold">Routing Engine</h4>
                  <p className="text-sm text-muted-foreground">Optimized navigation and traffic management</p>
                </div>
                <div className="text-center space-y-2">
                  <Globe className="h-16 w-16 text-primary mx-auto" />
                  <h4 className="font-semibold">Satellite-GPS Powered</h4>
                  <p className="text-sm text-muted-foreground">Reliable positioning even in remote areas</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Opportunity */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Market Opportunity</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Addressing critical healthcare challenges in Nigeria's growing population
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-red-600">11,800+</CardTitle>
                  <CardDescription>Road traffic accidents in 3 months of 2021</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">~10,200 injured & ~1,700 deaths</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-blue-600">227M+</CardTitle>
                  <CardDescription>Current population</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Projected to 359M by 2050</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-green-600">7.7M</CardTitle>
                  <CardDescription>Additional people to be protected</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">From health emergencies by 2025</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-purple-600">45%</CardTitle>
                  <CardDescription>Use private cars during emergencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Due to lack of coordinated ambulance services</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Foundational MVP */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Foundational MVP & Traction
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                We have already built and operated key foundational pillars
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <TrendingUp className="h-12 w-12 text-blue-500 mb-4" />
                  <CardTitle>Proven Logistics Operation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Real-world Nigerian logistics operations built upon daily use of third-party GPS-powered technology
                    for real-time vehicle tracking and navigation.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Active e-hailing and charter service operations</li>
                    <li>• Deep operational & market knowledge in Nigeria</li>
                    <li>• Proven logistics technology deployment</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="h-12 w-12 text-green-500 mb-4" />
                  <CardTitle>Proven Tech Capability</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Health-focused software development including AI components, serving as concrete evidence of our
                    team's capability in healthcare domain applications.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• AI-driven health platform development</li>
                    <li>• Data-intensive application experience</li>
                    <li>• Healthcare domain expertise</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Vision & Contact</h2>
                <p className="max-w-[800px] text-muted-foreground md:text-xl">
                  To establish a reliable digital platform for emergency healthcare logistics in Nigeria, building a
                  foundational 'central nervous system' for coordinating critical response and resource deployment
                  across Africa.
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row mt-8">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>bridgeocean@cyberservices.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>08135261568</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-6">
                <Link href="/contact">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    Get In Touch
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
