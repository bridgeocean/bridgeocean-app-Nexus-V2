"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Menu, X } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
    {
      href: "/nexus",
      label: "Nexus Emergency",
      active: pathname === "/nexus",
    },
    {
      href: "/charter",
      label: "Charter Services",
      active: pathname === "/charter",
    },
    {
      href: "/charter/partner",
      label: "Partner With Us",
      active: pathname === "/charter/partner",
    },
    {
      href: "/about",
      label: "About",
      active: pathname === "/about",
    },
    {
      href: "/contact",
      label: "Contact",
      active: pathname === "/contact",
    },
  ]

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        {/* Logo - Always visible */}
        <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
          <img src="/images/logo.png" alt="Bridgeocean" className="h-8 w-8" />
          <span className="font-bold whitespace-nowrap">Bridgeocean</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4 lg:space-x-6 mx-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
                route.active ? "text-black dark:text-white" : "text-muted-foreground",
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex ml-auto items-center space-x-4">
          <Link href="/admin-login">
            <span className="text-sm font-medium transition-colors hover:text-primary cursor-pointer whitespace-nowrap">
              Admin Dashboard
            </span>
          </Link>
          <ModeToggle />
          <UserNav />
        </div>

        {/* Mobile Right Side */}
        <div className="flex lg:hidden ml-auto items-center space-x-2">
          <ModeToggle />
          <button onClick={() => setIsOpen(!isOpen)} className="p-2" aria-label="Toggle menu">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t bg-background">
          <nav className="flex flex-col space-y-2 p-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary py-2 px-2 rounded",
                  route.active ? "text-black dark:text-white bg-accent" : "text-muted-foreground",
                )}
              >
                {route.label}
              </Link>
            ))}
            <Link
              href="/admin-login"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium transition-colors hover:text-primary py-2 px-2 rounded text-muted-foreground"
            >
              Admin Dashboard
            </Link>
            <div className="pt-2">
              <UserNav />
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
