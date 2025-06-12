"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Activity {
  id: string
  user: string
  action: string
  time: string
  amount?: string
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const generateActivities = () => {
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

    generateActivities()
    const interval = setInterval(generateActivities, 15000) // Update every 15 seconds

    return () => clearInterval(interval)
  }, [])

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
