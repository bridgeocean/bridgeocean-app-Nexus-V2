"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"
import { Menu, X } from 'lucide-react'
import { useState } from "react"

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/bridgeocean-logo.jpg"
              alt="Bridgeocean Logo"
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold">Bridgeocean</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
          <Link href="/nexus" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Nexus Emergency
          </Link>
          <Link href="/charter" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Charter Services
          </Link>
          <Link href="/charter/partner" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Partner With Us
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
            About
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden ml-auto">
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div className="ml-auto hidden md:flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              href="/nexus"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Nexus Emergency
            </Link>
            <Link
              href="/charter"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Charter Services
            </Link>
            <Link
              href="/charter/partner"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Partner With Us
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center space-x-4 pt-2">
              <ModeToggle />
              <UserNav />
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
