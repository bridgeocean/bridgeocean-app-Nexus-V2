"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import Image from "next/image"
import Link from "next/link"
import { Satellite, Calendar, Users, Shield, Clock, Star, Navigation, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="w-fit border-red-500 text-red-500">
                    Satellite-Powered Technology
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none">
                    Routing as a Service & Emergency Logistics
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Advanced satellite-powered routing solutions with our flagship Nexus Emergency Logistics platform,
                    complemented by premium charter services and intelligent driver management systems.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/nexus">
                    <Button size="lg" className="gap-1.5 bg-red-600 hover:bg-red-700">
                      <Satellite className="h-4 w-4" />
                      Nexus Emergency Logistics
                    </Button>
                  </Link>
                  <Link href="/charter/book">
                    <Button size="lg" variant="outline">
                      Charter Services
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full">
                  <Image
                    src="/images/luxury-car-hero.jpg"
                    alt="Satellite-Powered Routing Solutions"
                    fill
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Core Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Satellite-powered routing solutions and comprehensive transportation services
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card className="relative overflow-hidden border-red-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <Satellite className="h-8 w-8 text-red-600" />
                    <CardTitle className="text-2xl">Nexus Emergency Logistics</CardTitle>
                  </div>
                  <Badge variant="outline" className="w-fit border-red-500 text-red-500">
                    Flagship Platform
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    Satellite-powered emergency coordination platform leveraging AI intelligent coordination, routing
                    engine, and GPS technology for life-saving emergency response.
                  </CardDescription>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-4 w-4 text-red-500" />
                      <span>AI Coordination</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span>Routing Engine</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Satellite className="h-4 w-4 text-green-500" />
                      <span>Satellite-GPS</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span>24/7 Emergency</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Link href="/nexus">
                      <Button className="bg-red-600 hover:bg-red-700">Learn More</Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline">Partner With Us</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-8 w-8 text-primary" />
                    <CardTitle className="text-2xl">Charter & Driver Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base">
                    Premium charter services with intelligent driver onboarding platform that streamlines recruitment,
                    interviews, and fleet management operations.
                  </CardDescription>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span>Fully Insured</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span>24/7 Service</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>Premium Fleet</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-purple-500" />
                      <span>Smart Management</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Link href="/charter/book">
                      <Button>Book Charter</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Fleet Showcase Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Premium Fleet</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Experience luxury and comfort with our selection of premium vehicles
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

        {/* Partner Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Partner With Us</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our routing solutions network or charter fleet to maximize your potential
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/nexus">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    Emergency Logistics Partnership
                  </Button>
                </Link>
                <Link href="/charter/partner">
                  <Button size="lg" variant="outline">
                    Register Your Vehicle
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row mx-auto px-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/bridgeocean-logo.jpg"
              alt="Bridgeocean Logo"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
            <p className="text-sm text-muted-foreground">© 2025 Bridgeocean Limited. All rights reserved.</p>
          </div>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a
              href="https://www.facebook.com/profile.php?id=61557691785062"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/bridgeoceanlimited/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
