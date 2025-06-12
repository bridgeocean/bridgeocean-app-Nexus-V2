"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { supabase } from "@/lib/supabase"

interface MonthlyData {
  name: string
  total: number
}

export function Overview() {
  const [data, setData] = useState<MonthlyData[]>([
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true)

        // Try to get real booking data from Supabase
        const { data: bookings, error } = await supabase.from("charter_bookings").select("*")

        if (error) {
          console.error("Error loading bookings:", error)
          generateDemoData()
          return
        }

        if (bookings && bookings.length > 0) {
          // Initialize monthly totals
          const monthlyTotals = Array(12).fill(0)

          // Process bookings to get monthly totals
          bookings.forEach((booking) => {
            if (booking.created_at) {
              const bookingDate = new Date(booking.created_at)
              const month = bookingDate.getMonth()
              const amount = booking.total_amount || 0
              monthlyTotals[month] += amount
            }
          })

          // Create chart data
          const chartData = data.map((item, index) => ({
            name: item.name,
            total: monthlyTotals[index],
          }))

          setData(chartData)
        } else {
          // No real data, use demo data
          generateDemoData()
        }
      } catch (error) {
        console.error("Error in chart data loading:", error)
        generateDemoData()
      } finally {
        setLoading(false)
      }
    }

    const generateDemoData = () => {
      const currentMonth = new Date().getMonth()
      const newData = data.map((item, index) => ({
        ...item,
        total: index <= currentMonth ? Math.floor(Math.random() * 5000) + 1000 : Math.floor(Math.random() * 2000),
      }))
      setData(newData)
    }

    loadChartData()
    const interval = setInterval(loadChartData, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="h-[350px] w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₦${value}`}
        />
        <Tooltip formatter={(value) => [`₦${value}`, "Revenue"]} />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
