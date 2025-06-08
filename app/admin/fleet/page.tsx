"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Car, Plus, Edit, Trash2, Eye, Upload } from "lucide-react"

// Sample fleet data - replace with your actual vehicles
const initialFleet = [
  {
    id: "1",
    name: "Toyota Camry",
    category: "Sedan",
    year: "2020",
    passengers: 4,
    pricePerHour: 15000,
    status: "Available",
    features: ["AC", "GPS", "Bluetooth"],
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "2",
    name: "Honda Pilot",
    category: "SUV",
    year: "2021",
    passengers: 7,
    pricePerHour: 25000,
    status: "Booked",
    features: ["AC", "GPS", "Entertainment System"],
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function FleetManagementPage() {
  const [fleet, setFleet] = useState(initialFleet)
  const [isAddingVehicle, setIsAddingVehicle] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState(null)

  const [newVehicle, setNewVehicle] = useState({
    name: "",
    category: "",
    year: "",
    passengers: "",
    pricePerHour: "",
    features: [],
    description: "",
  })

  const handleAddVehicle = () => {
    const vehicle = {
      id: Date.now().toString(),
      ...newVehicle,
      status: "Available",
      image: "/placeholder.svg?height=200&width=300",
    }
    setFleet([...fleet, vehicle])
    setNewVehicle({
      name: "",
      category: "",
      year: "",
      passengers: "",
      pricePerHour: "",
      features: [],
      description: "",
    })
    setIsAddingVehicle(false)
  }

  const handleDeleteVehicle = (id: string) => {
    setFleet(fleet.filter((vehicle) => vehicle.id !== id))
  }

  const toggleVehicleStatus = (id: string) => {
    setFleet(
      fleet.map((vehicle) =>
        vehicle.id === id ? { ...vehicle, status: vehicle.status === "Available" ? "Booked" : "Available" } : vehicle,
      ),
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Fleet Management</h2>
          <Dialog open={isAddingVehicle} onOpenChange={setIsAddingVehicle}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Vehicle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Vehicle</DialogTitle>
                <DialogDescription>Add a new vehicle to your charter fleet</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle-name">Vehicle Name</Label>
                    <Input
                      id="vehicle-name"
                      placeholder="e.g., Toyota Camry 2020"
                      value={newVehicle.name}
                      onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      value={newVehicle.category}
                      onValueChange={(value) => setNewVehicle({ ...newVehicle, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="luxury-sedan">Luxury Sedan</SelectItem>
                        <SelectItem value="luxury-suv">Luxury SUV</SelectItem>
                        <SelectItem value="van">Van</SelectItem>
                        <SelectItem value="bus">Bus</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      placeholder="2020"
                      value={newVehicle.year}
                      onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="passengers">Passengers</Label>
                    <Input
                      id="passengers"
                      type="number"
                      placeholder="4"
                      value={newVehicle.passengers}
                      onChange={(e) => setNewVehicle({ ...newVehicle, passengers: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Hour (₦)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="15000"
                      value={newVehicle.pricePerHour}
                      onChange={(e) => setNewVehicle({ ...newVehicle, pricePerHour: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Vehicle description and features..."
                    value={newVehicle.description}
                    onChange={(e) => setNewVehicle({ ...newVehicle, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Vehicle Images</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground mb-4">Upload vehicle photos</p>
                    <Button variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setIsAddingVehicle(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleAddVehicle} className="flex-1">
                    Add Vehicle
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fleet.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
              <Car className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fleet.filter((v) => v.status === "Available").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Booked</CardTitle>
              <Car className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fleet.filter((v) => v.status === "Booked").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Price/Hour</CardTitle>
              <Car className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₦{Math.round(fleet.reduce((acc, v) => acc + Number(v.pricePerHour), 0) / fleet.length)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Fleet Overview</CardTitle>
            <CardDescription>Manage your charter vehicle fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Passengers</TableHead>
                  <TableHead>Price/Hour</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fleet.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">{vehicle.name}</TableCell>
                    <TableCell>{vehicle.category}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{vehicle.passengers}</TableCell>
                    <TableCell>₦{vehicle.pricePerHour}</TableCell>
                    <TableCell>
                      <Badge
                        variant={vehicle.status === "Available" ? "default" : "secondary"}
                        className={vehicle.status === "Available" ? "bg-green-500" : "bg-red-500"}
                      >
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => toggleVehicleStatus(vehicle.id)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteVehicle(vehicle.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>WhatsApp Fleet Integration</CardTitle>
            <CardDescription>Sync your WhatsApp catalog with the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Current WhatsApp Catalog</h4>
                <p className="text-sm text-muted-foreground">View your current fleet on WhatsApp Business</p>
              </div>
              <Button onClick={() => window.open("https://wa.me/c/2349135630154", "_blank")}>View Catalog</Button>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Sync Fleet Data</h4>
                <p className="text-sm text-muted-foreground">
                  Import vehicles from your WhatsApp catalog automatically
                </p>
              </div>
              <Button variant="outline">Import from WhatsApp</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
