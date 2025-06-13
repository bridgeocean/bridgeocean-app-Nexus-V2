"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { supabase } from "@/lib/supabase"

interface Activity {
  id: string
  user: string
  action: string
  time: string
  amount?: string
}

interface Candidate {
  id: string
  name?: string
  status?: string
  created_at?: string
}

interface Booking {
  id: string
  customer_name?: string
  created_at?: string
  total_amount?: number
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadRecentActivity = async () => {
      try {
        setLoading(true)

        // Try to load real data from candidates and bookings
        const [candidatesResult, bookingsResult] = await Promise.allSettled([
          supabase.from("candidates").select("*").order("created_at", { ascending: false }).limit(3),
          supabase.from("charter_bookings").select("*").order("created_at", { ascending: false }).limit(3),
        ])

        const recentActivities: Activity[] = []

        // Process candidates
        if (candidatesResult.status === "fulfilled" && candidatesResult.value?.data) {
          candidatesResult.value.data.forEach((candidate: Candidate) => {
            let action = "Applied for driver position"
            if (candidate.status === "active") action = "Became active driver"
            if (candidate.status === "interview") action = "Scheduled for interview"
            if (candidate.status === "onboarding") action = "Started onboarding"

            recentActivities.push({
              id: `candidate-${candidate.id}`,
              user: candidate.name || "New Candidate",
              action,
              time: formatTimeAgo(candidate.created_at || new Date().toISOString()),
            })
          })
        }

        // Process bookings
        if (bookingsResult.status === "fulfilled" && bookingsResult.value?.data) {
          bookingsResult.value.data.forEach((booking: Booking) => {
            recentActivities.push({
              id: `booking-${booking.id}`,
              user: booking.customer_name || "Customer",
              action: "Made a charter booking",
              time: formatTimeAgo(booking.created_at || new Date().toISOString()),
              amount: booking.total_amount ? `₦${booking.total_amount}` : undefined,
            })
          })
        }

        // If we have real data, use it
        if (recentActivities.length > 0) {
          // Sort by most recent
          recentActivities.sort((a, b) => {
            return a.time.localeCompare(b.time)
          })

          setActivities(recentActivities)
        } else {
          // Fallback to demo data
          generateDemoActivities()
        }
      } catch (error) {
        console.error("Error loading recent activity:", error)
        generateDemoActivities()
      } finally {
        setLoading(false)
      }
    }

    const generateDemoActivities = () => {
      const baseActivities = [
        { user: "John Doe", action: "Applied for driver position", amount: "" },
        { user: "Jane Smith", action: "Completed interview", amount: "" },
        { user: "Mike Johnson", action: "Paid caution fee", amount: "₦150,000" },
        { user: "Sarah Wilson", action: "Charter booking confirmed", amount: "₦25,000" },
        { user: "David Brown", action: "Document verification", amount: "" },
        { user: "Lisa Davis", action: "Home visitation scheduled", amount: "" },
        { user: "Tom Wilson", action: "Contract signed", amount: "" },
        { user: "Emma Taylor", action: "Vehicle inspection passed", amount: "" },
      ]

      const shuffled = [...baseActivities].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, 5).map((activity, index) => ({
        id: `activity-${index}`,
        user: activity.user,
        action: activity.action,
        amount: activity.amount,
        time: `${Math.floor(Math.random() * 60) + 1}m ago`,
      }))

      setActivities(selected)
    }

    // Format time ago (e.g., "5m ago", "2h ago")
    const formatTimeAgo = (dateString: string) => {
      const date = new Date(dateString)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffMins = Math.floor(diffMs / 60000)

      if (diffMins < 60) {
        return `${diffMins}m ago`
      } else if (diffMins < 1440) {
        return `${Math.floor(diffMins / 60)}h ago`
      } else {
        return `${Math.floor(diffMins / 1440)}d ago`
      }
    }

    loadRecentActivity()
    const interval = setInterval(loadRecentActivity, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="ml-4 space-y-1 flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="ml-auto">
              <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>
              {activity.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto font-medium">
            {activity.amount && <div className="text-sm">{activity.amount}</div>}
            <div className="text-xs text-muted-foreground">{activity.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
