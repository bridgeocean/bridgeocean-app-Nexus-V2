"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function Overview() {
  const [data, setData] = useState([
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

  useEffect(() => {
    // Simulate dynamic data loading
    const updateData = () => {
      const currentMonth = new Date().getMonth()
      const newData = data.map((item, index) => ({
        ...item,
        total: index <= currentMonth ? Math.floor(Math.random() * 5000) + 1000 : Math.floor(Math.random() * 2000),
      }))
      setData(newData)
    }

    updateData()
    const interval = setInterval(updateData, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

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
