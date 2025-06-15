"use client"

import { VehicleCard } from "@/components/vehicle-card"
import { vehiclesData } from "@/data/vehicles"

export default function TestFleetPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Fleet Test Page</h1>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
          {vehiclesData.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  )
}
