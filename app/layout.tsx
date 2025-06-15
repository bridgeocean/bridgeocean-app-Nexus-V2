import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "BridgeOcean - AI Emergency Routing & Satellite Logistics",
  description:
    "Revolutionary AI-powered emergency response system with satellite navigation, intelligent routing algorithms, and real-time crisis coordination. Nexus platform saves lives through cutting-edge technology.",
  keywords:
    "AI emergency response, satellite logistics, emergency routing, crisis coordination, satellite navigation, emergency management, AI routing, emergency services",
  authors: [{ name: "BridgeOcean" }],
  openGraph: {
    title: "BridgeOcean - AI Emergency Routing & Satellite Logistics",
    description:
      "Revolutionary AI-powered emergency response system with satellite navigation and intelligent routing algorithms. Our Nexus platform saves lives through cutting-edge technology.",
    url: "https://www.bridgeocean.xyz",
    siteName: "BridgeOcean",
    type: "website",
    images: [
      {
        url: "/images/bridgeocean-hero-car.png",
        width: 1200,
        height: 630,
        alt: "BridgeOcean AI Emergency Response System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BridgeOcean - AI Emergency Routing & Satellite Logistics",
    description:
      "Revolutionary AI-powered emergency response system with satellite navigation and intelligent routing algorithms.",
    images: ["/images/bridgeocean-hero-car.png"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: "Europa Grotesk SH Medium, sans-serif" }}>
        {children}
      </body>
    </html>
  )
}
