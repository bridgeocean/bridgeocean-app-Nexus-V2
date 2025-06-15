"use client"

import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Car, Users, Shield, Clock, Star, Fuel, Settings, MapPin } from "lucide-react"

// Inline vehicle data to avoid import issues
const vehicles = [
  {
    id: 1,
    name: "Toyota Camry",
    year: "2006",
    category: "Sedan",
    color: "Silver",
    passengers: 4,
    price: "₦100,000 per 10 hours",
    image: "/images/camry-final.jpg",
    features: ["Leather Interior", "Air Conditioning", "Fuel Efficient", "Professional Driver"],
    specifications: {
      engine: "2.4L 4-Cylinder",
      transmission: "Automatic",
      fuelType: "Gasoline",
      mileage: "25 MPG",
    },
    available: true,
    description:
      "Reliable sedan with excellent comfort and fuel efficiency. Perfect for business trips and city travel.",
    note: "*Within Lagos. Additional charges apply for trips outside Lagos.",
    rating: 4.5,
    location: "Lagos",
  },
  {
    id: 2,
    name: "GMC Terrain",
    year: "2011",
    category: "SUV",
    color: "Black",
    passengers: 5,
    price: "₦200,000 per 10 hours",
    image: "/images/GMC.jpg",
    features: [
      "Premium Interior",
      "Entertainment System",
      "All-Wheel Drive",
      "Professional Driver",
      "Climate Control",
      "Bluetooth Connectivity",
      "Spacious Cargo",
    ],
    specifications: {
      engine: "2.4L ECOTEC",
      transmission: "6-Speed Automatic",
      fuelType: "Gasoline",
      mileage: "22 MPG",
    },
    available: true,
    description:
      "Sophisticated black SUV with premium comfort features and excellent road presence. Ideal for executive travel, family trips, and group transportation with style and reliability.",
    note: "*Within Lagos. Additional charges apply for trips outside Lagos.",
    rating: 4.8,
    location: "Lagos",
  },
]

function VehicleCard({ vehicle, className = "" }: { vehicle: any; className?: string }) {
  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {/* Vehicle Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={vehicle.image || "/placeholder.svg?height=256&width=400&text=Vehicle"}
          alt={`${vehicle.name} ${vehicle.year}`}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge variant={vehicle.available ? "default" : "secondary"}>
            {vehicle.available ? "Available" : "Booked"}
          </Badge>
          {vehicle.color && (
            <Badge variant="outline" className="bg-white/90">
              {vehicle.color}
            </Badge>
          )}
        </div>
        {vehicle.rating && (
          <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">{vehicle.rating}</span>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">
              {vehicle.name} ({vehicle.year})
            </CardTitle>
            <CardDescription className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                {vehicle.category}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {vehicle.passengers} passengers
              </div>
              {vehicle.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {vehicle.location}
                </div>
              )}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-primary">{vehicle.price}</div>
            <p className="text-xs text-muted-foreground mt-1">{vehicle.note}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed">{vehicle.description}</p>

        {/* Specifications */}
        {vehicle.specifications && Object.keys(vehicle.specifications).length > 0 && (
          <div className="grid grid-cols-2 gap-3 p-3 bg-muted/50 rounded-lg">
            {vehicle.specifications.engine && (
              <div className="flex items-center gap-2 text-sm">
                <Settings className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Engine:</span>
                <span className="font-medium">{vehicle.specifications.engine}</span>
              </div>
            )}
            {vehicle.specifications.fuelType && (
              <div className="flex items-center gap-2 text-sm">
                <Fuel className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Fuel:</span>
                <span className="font-medium">{vehicle.specifications.fuelType}</span>
              </div>
            )}
            {vehicle.specifications.transmission && (
              <div className="flex items-center gap-2 text-sm col-span-2">
                <span className="text-muted-foreground">Transmission:</span>
                <span className="font-medium">{vehicle.specifications.transmission}</span>
              </div>
            )}
          </div>
        )}

        {/* Features */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Features & Amenities
          </h4>
          <div className="flex flex-wrap gap-2">
            {vehicle.features.map((feature: string) => (
              <Badge key={feature} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Link href={`/charter/book?vehicle=${vehicle.id}`} className="flex-1">
            <Button className="w-full" disabled={!vehicle.available}>
              {vehicle.available ? "Book This Vehicle" : "Currently Unavailable"}
            </Button>
          </Link>
          <Button variant="outline" size="icon" className="shrink-0">
            <Star className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

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

            {/* Vehicle Cards Grid - GMC on the right */}
            <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
              {vehicles.map((vehicle, index) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  className={index === 1 ? "lg:order-2" : "lg:order-1"} // GMC (index 1) goes to the right
                />
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
