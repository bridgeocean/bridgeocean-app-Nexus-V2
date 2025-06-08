"use client"

import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Heart, Car, Plane, Route, Users, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit">
                    Health-Tech Pioneer
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Bridgeocean Limited
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A pioneering health-tech company headquartered in Lagos, Nigeria, dedicated to solving critical
                    challenges in healthcare and mobility.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-full">
                  <Image
                    src="/images/gmc-terrain.jpg"
                    alt="Bridgeocean Fleet"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mission</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                While our operations include a portfolio of mobility solutions, our core mission is centered on our
                flagship initiative: the Nexus Emergency Logistics platform.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="text-center">
                <CardHeader>
                  <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <CardTitle>Healthcare Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our flagship Nexus Emergency Logistics platform addresses critical healthcare challenges with
                    innovative solutions.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Car className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <CardTitle>Mobility Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Comprehensive automotive solutions including luxury rentals, airport services, and professional
                    transportation.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <CardTitle>Enterprise Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Tailored automotive solutions designed specifically for enterprise clients and business needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Bridgeocean Limited is committed to delivering tailored automotive solutions to enterprises
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Route className="h-8 w-8 text-blue-500 mb-2" />
                  <CardTitle>Routing Services</CardTitle>
                  <CardDescription>Intelligent routing and logistics management</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Optimized route planning</li>
                    <li>• Real-time traffic management</li>
                    <li>• GPS tracking systems</li>
                    <li>• Logistics coordination</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Plane className="h-8 w-8 text-green-500 mb-2" />
                  <CardTitle>Airport Services</CardTitle>
                  <CardDescription>Premium airport pickup and transportation</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Airport pickup & drop-off</li>
                    <li>• Flight tracking services</li>
                    <li>• VIP transportation</li>
                    <li>• Corporate travel solutions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Car className="h-8 w-8 text-purple-500 mb-2" />
                  <CardTitle>Luxury Car Rentals</CardTitle>
                  <CardDescription>Premium vehicle rental services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Luxury vehicle fleet</li>
                    <li>• Professional chauffeurs</li>
                    <li>• Event transportation</li>
                    <li>• Corporate rentals</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-orange-500 mb-2" />
                  <CardTitle>People Transportation</CardTitle>
                  <CardDescription>Comprehensive passenger transportation solutions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Group transportation</li>
                    <li>• Corporate shuttles</li>
                    <li>• Event logistics</li>
                    <li>• Custom transport solutions</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-indigo-500 mb-2" />
                  <CardTitle>Enterprise Management</CardTitle>
                  <CardDescription>Complete fleet and service management</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Fleet management systems</li>
                    <li>• Service coordination</li>
                    <li>• Quality assurance</li>
                    <li>• Performance analytics</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Fleet Showcase */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Fleet</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Our current fleet includes premium vehicles for all your transportation needs
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center mt-4">
                <Button variant="outline" onClick={() => window.open("https://wa.me/c/2349135630154", "_blank")}>
                  View Complete Fleet on WhatsApp
                </Button>
                <Link href="/charter/fleet">
                  <Button>Explore Our Fleet</Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="overflow-hidden">
                <div className="relative h-80 w-full">
                  <Image src="/images/camry-final.jpg" alt="Toyota Camry" fill className="object-contain bg-muted" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">Toyota Camry (2006)</h3>
                      <p className="text-muted-foreground">Reliable sedan with excellent comfort and fuel efficiency</p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">Sedan</Badge>
                  </div>
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Price:</span>
                      <span className="font-bold">₦100,000 per 10 hours</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      *Within Lagos. Additional charges apply for trips outside Lagos.
                    </p>
                    <Link href="/charter/book">
                      <Button className="w-full mt-2">Book Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative h-80 w-full">
                  <Image src="/images/gmc-final.jpg" alt="GMC Terrain" fill className="object-contain bg-muted" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">GMC Terrain (2011)</h3>
                      <p className="text-muted-foreground">
                        Spacious SUV with premium comfort features and excellent road presence
                      </p>
                    </div>
                    <Badge className="bg-primary text-primary-foreground">SUV</Badge>
                  </div>
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Price:</span>
                      <span className="font-bold">₦200,000 per 10 hours</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      *Within Lagos. Additional charges apply for trips outside Lagos.
                    </p>
                    <Link href="/charter/book">
                      <Button className="w-full mt-2">Book Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Company Info Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>About Bridgeocean Limited</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div>
                      <h4 className="font-medium">Headquarters</h4>
                      <p className="text-sm text-muted-foreground">Lagos, Nigeria</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Industry</h4>
                      <p className="text-sm text-muted-foreground">Health-Tech & Mobility Solutions</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Established</h4>
                      <p className="text-sm text-muted-foreground">Nigeria</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Specialization</h4>
                      <p className="text-sm text-muted-foreground">
                        Emergency Logistics, Healthcare Mobility, Enterprise Transportation
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Our Values</CardTitle>
                  <CardDescription>What drives us forward</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Heart className="h-5 w-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Healthcare First</h4>
                        <p className="text-sm text-muted-foreground">
                          Prioritizing health and emergency services in everything we do
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Reliability</h4>
                        <p className="text-sm text-muted-foreground">
                          Dependable services you can trust in critical moments
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">24/7 Availability</h4>
                        <p className="text-sm text-muted-foreground">
                          Round-the-clock service for emergency and business needs
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
