"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Car, Users, Shield, Star, Fuel, Settings, MapPin } from "lucide-react"

export interface VehicleData {
  id: number
  name: string
  year: string
  category: string
  color?: string
  passengers: number
  price: string
  image: string
  features: string[]
  specifications: {
    engine?: string
    transmission?: string
    fuelType?: string
    mileage?: string
  }
  available: boolean
  description: string
  note: string
  rating?: number
  location?: string
}

interface VehicleCardProps {
  vehicle: VehicleData
  className?: string
}

export function VehicleCard({ vehicle, className = "" }: VehicleCardProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}>
      {/* Vehicle Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={vehicle.image || "/placeholder.svg"}
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
        {Object.keys(vehicle.specifications).length > 0 && (
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
            {vehicle.features.map((feature) => (
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
