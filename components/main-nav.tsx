"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, Satellite, Car, Phone, Users, BarChart3 } from "lucide-react"
import { useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      icon: <Satellite className="h-4 w-4" />,
      active: pathname === "/",
    },
    {
      href: "/nexus",
      label: "Nexus Emergency",
      icon: <Satellite className="h-4 w-4" />,
      active: pathname === "/nexus",
    },
    {
      href: "/charter",
      label: "Charter Services",
      icon: <Car className="h-4 w-4" />,
      active: pathname === "/charter",
    },
    {
      href: "/about",
      label: "About",
      icon: <Users className="h-4 w-4" />,
      active: pathname === "/about",
    },
    {
      href: "/contact",
      label: "Contact",
      icon: <Phone className="h-4 w-4" />,
      active: pathname === "/contact",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <BarChart3 className="h-4 w-4" />,
      active: pathname.startsWith("/dashboard"),
    },
  ]

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 lg:px-6">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Satellite className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">BridgeOcean</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "transition-colors hover:text-foreground/80 flex items-center space-x-2",
                  route.active ? "text-foreground" : "text-foreground/60",
                )}
              >
                {route.icon}
                <span className="hidden lg:inline-block">{route.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <Link href="/" className="mr-4 flex items-center space-x-2">
            <Satellite className="h-6 w-6" />
            <span className="font-bold text-sm">BridgeOcean</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Desktop actions */}
            <div className="hidden md:flex items-center space-x-2">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col space-y-1 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground break-words",
                  route.active ? "bg-accent text-accent-foreground" : "text-foreground/60",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {route.icon}
                <span className="flex-1 min-w-0 break-words">{route.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm font-medium">Theme</span>
                <ModeToggle />
              </div>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
