"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Car, Users, Shield, Clock, Star } from "lucide-react"

const vehicles = [
  {
    id: 1,
    name: "Toyota Camry",
    year: "2006",
    category: "Sedan",
    passengers: 4,
    price: "₦100,000 per 10 hours",
    image: "/images/camry-final.jpg",
    features: ["Leather Interior", "Air Conditioning", "Fuel Efficient", "Professional Driver"],
    available: true,
    description:
      "Reliable sedan with excellent comfort and fuel efficiency. Perfect for business trips and city travel.",
    note: "*Within Lagos. Additional charges apply for trips outside Lagos.",
  },
  {
    id: 2,
    name: "GMC Terrain",
    year: "2011",
    category: "SUV",
    passengers: 5,
    price: "₦200,000 per 10 hours",
    image: "/images/gmc-final.jpg",
    features: ["Spacious Interior", "Entertainment System", "Comfortable Ride", "Professional Driver"],
    available: true,
    description:
      "Spacious SUV with premium comfort features and excellent road presence. Ideal for family trips and group travel.",
    note: "*Within Lagos. Additional charges apply for trips outside Lagos.",
  },
]

export default function FleetPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary/10 to-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Our Premium Fleet
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Experience luxury transportation with our carefully selected vehicles
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/charter/book">
                  <Button size="lg" className="gap-1.5">
                    <Car className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open("https://wa.me/c/2349135630154", "_blank")}
                >
                  View WhatsApp Catalog
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Fully Insured</CardTitle>
                  <CardDescription>All our vehicles are comprehensively insured for your peace of mind</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>24/7 Availability</CardTitle>
                  <CardDescription>Round-the-clock service for all your transportation needs</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>Professional Drivers</CardTitle>
                  <CardDescription>Experienced, licensed, and courteous professional drivers</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Fleet Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Available Vehicles</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Choose from our selection of premium vehicles for your transportation needs
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id} className="overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={vehicle.image || "/placeholder.svg"}
                      alt={vehicle.name}
                      fill
                      className="object-contain bg-background"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge variant={vehicle.available ? "default" : "secondary"}>
                        {vehicle.available ? "Available" : "Booked"}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          {vehicle.name} ({vehicle.year})
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Car className="h-4 w-4" />
                          {vehicle.category}
                          <Users className="h-4 w-4 ml-2" />
                          {vehicle.passengers} passengers
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">{vehicle.price}</div>
                        <p className="text-xs text-muted-foreground">{vehicle.note}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{vehicle.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {vehicle.features.map((feature) => (
                          <Badge key={feature} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/charter/book?vehicle=${vehicle.id}`} className="flex-1">
                          <Button className="w-full" disabled={!vehicle.available}>
                            {vehicle.available ? "Book This Vehicle" : "Currently Unavailable"}
                          </Button>
                        </Link>
                        <Button variant="outline" size="icon">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Book?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Experience premium transportation with Bridgeocean Charter Services
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/charter/book">
                  <Button size="lg">Book Your Ride</Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Contact Us
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
