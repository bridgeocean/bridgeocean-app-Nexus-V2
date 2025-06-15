import type { VehicleData } from "@/components/vehicle-card"

export const vehiclesData: VehicleData[] = [
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
