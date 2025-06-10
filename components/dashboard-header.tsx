"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LogOut, User, Settings, UserCheck } from "lucide-react"
import { useAuth } from "./auth-provider"
import { useEffect, useState } from "react"
import Image from "next/image"

export function DashboardHeader() {
  const { user, logout } = useAuth()
  const [pendingCount, setPendingCount] = useState(0)

  useEffect(() => {
    // Check for pending approvals if user is admin
    if (user?.role === "admin") {
      const pending = JSON.parse(localStorage.getItem("pendingApprovals") || "[]")
      const pendingApprovals = pending.filter((u: any) => u.status === "pending").length
      setPendingCount(pendingApprovals)
    }
  }, [user])

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-32 h-8 relative">
            <Image src="/images/logo.png" alt="BridgeOcean Logo" fill style={{ objectFit: "contain" }} />
          </div>
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {user?.role === "admin" && (
            <>
              <Link href="/admin/approvals">
                <Button variant="outline" size="sm" className="relative">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Approvals
                  {pendingCount > 0 && (
                    <Badge variant="destructive" className="ml-2 px-1 py-0 text-xs">
                      {pendingCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link href="/dashboard/settings">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
