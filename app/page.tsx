"use client"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Car, Calendar, MapPin, Users, Satellite, Shield, Phone, Mail } from "lucide-react"

export default function Home() {
  const openWhatsAppCatalogue = () => {
    window.open("https://wa.me/c/2349135630154", "_blank")
  }

  const handleNavigation = (url: string) => {
    window.location.href = url
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_500px] items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <Badge variant="outline" className="border-red-500 text-red-500 w-fit px-3 py-1 text-sm">
                    Satellite-Powered Technology
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl text-black leading-tight">
                    Routing as a Service & Emergency Logistics
                  </h1>
                  <p className="max-w-[600px] text-gray-600 text-lg leading-relaxed">
                    Advanced satellite-powered routing solutions with our flagship Nexus Emergency Logistics platform,
                    complemented by premium charter services and intelligent driver management systems.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-red-600 text-white hover:bg-red-700 px-6 py-3 text-base flex items-center gap-2"
                    onClick={() => handleNavigation("/nexus")}
                  >
                    <Satellite className="h-5 w-5" />
                    Nexus Emergency Logistics
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 text-base"
                    onClick={() => handleNavigation("/charter/book")}
                  >
                    Charter Services
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[400px] w-full bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Car className="h-24 w-24 text-red-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-800">Premium Fleet</h3>
                    <p className="text-gray-600">Professional Transportation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="w-full py-16 bg-gray-50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Our Core Services</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Satellite-powered routing solutions and comprehensive transportation management services.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Nexus Emergency Logistics */}
              <Card className="border border-red-200 bg-white shadow-sm">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
                    <Satellite className="h-8 w-8 text-red-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-black flex items-center justify-center gap-2">
                    <Satellite className="h-5 w-5 text-red-600" />
                    Nexus Emergency Logistics
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Advanced satellite-powered emergency response and logistics coordination system.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <Shield className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span>Real-time Emergency Response</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Satellite className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span>Satellite-Powered Tracking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <span>Advanced Route Optimization</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-4"
                    onClick={() => handleNavigation("/nexus")}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              {/* Charter & Driver Management */}
              <Card className="border border-blue-200 bg-white shadow-sm">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                    <Car className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl font-bold text-black">Charter & Driver Management</CardTitle>
                  <CardDescription className="text-gray-600">
                    Premium vehicle charter services with intelligent driver management systems.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <Car className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span>Premium Vehicle Fleet</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span>Professional Drivers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span>Advanced Booking System</span>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4"
                    onClick={() => handleNavigation("/charter/book")}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Premium Fleet Section */}
        <section className="w-full py-16 bg-white">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Our Premium Fleet</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our range of premium vehicles designed for comfort, style, and reliability.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-8">
              {/* Toyota Camry */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Car className="h-16 w-16 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-700 font-semibold">Toyota Camry 2006</p>
                      <p className="text-gray-500 text-sm">Black Sedan</p>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold">Toyota Camry (2006)</CardTitle>
                  <CardDescription className="text-gray-600">
                    Comfortable black sedan perfect for city travel and airport transfers. Features leather seats and
                    climate control.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-black">₦100,000</span>
                    <span className="text-sm text-gray-500">per 10 hours</span>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={openWhatsAppCatalogue}>
                    Book via WhatsApp
                  </Button>
                </CardContent>
              </Card>

              {/* GMC Terrain */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <Car className="h-16 w-16 text-gray-600 mx-auto mb-2" />
                      <p className="text-gray-700 font-semibold">GMC Terrain 2011</p>
                      <p className="text-gray-500 text-sm">Black SUV</p>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold">GMC Terrain (2011)</CardTitle>
                  <CardDescription className="text-gray-600">
                    Spacious black SUV ideal for group travel and longer journeys. Features premium interior and
                    entertainment system.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-black">₦200,000</span>
                    <span className="text-sm text-gray-500">per 10 hours</span>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={openWhatsAppCatalogue}>
                    Book via WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="text-center">
              <Button onClick={openWhatsAppCatalogue} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                View Full Fleet on WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* Partner With Us Section */}
        <section className="w-full py-16 bg-red-50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-black mb-4">Partner With Us</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Join our routing solutions network or charter fleet to maximize your potential
              </p>
              <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center items-center">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3"
                  onClick={openWhatsAppCatalogue}
                >
                  Emergency Logistics Partnership
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3"
                  onClick={openWhatsAppCatalogue}
                >
                  Register Your Vehicle
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-16 bg-gray-100">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-black mb-4">Get In Touch</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ready to book? Contact us directly via WhatsApp for immediate assistance.
              </p>
            </div>
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Phone className="h-6 w-6 text-red-600" />
                      <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-gray-600">+234 906 918 3165</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Mail className="h-6 w-6 text-red-600" />
                      <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-gray-600">bridgeocean@cyberservices.com</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-6 w-6 text-red-600" />
                      <div>
                        <p className="font-semibold">Location</p>
                        <p className="text-gray-600">Lagos, Nigeria</p>
                      </div>
                    </div>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                      onClick={openWhatsAppCatalogue}
                    >
                      📱 Contact via WhatsApp
                    </Button>
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
