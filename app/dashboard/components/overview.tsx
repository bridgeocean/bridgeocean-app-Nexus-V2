"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    screening: 40,
    selection: 24,
    interview: 18,
    onboarding: 12,
  },
  {
    name: "Feb",
    screening: 45,
    selection: 28,
    interview: 20,
    onboarding: 15,
  },
  {
    name: "Mar",
    screening: 52,
    selection: 32,
    interview: 24,
    onboarding: 18,
  },
  {
    name: "Apr",
    screening: 48,
    selection: 30,
    interview: 22,
    onboarding: 16,
  },
  {
    name: "May",
    screening: 60,
    selection: 38,
    interview: 28,
    onboarding: 20,
  },
  {
    name: "Jun",
    screening: 65,
    selection: 42,
    interview: 30,
    onboarding: 22,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="screening" fill="#e11d48" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="selection" fill="#f43f5e" radius={[4, 4, 0, 0]} className="fill-primary/80" />
        <Bar dataKey="interview" fill="#fb7185" radius={[4, 4, 0, 0]} className="fill-primary/60" />
        <Bar dataKey="onboarding" fill="#fda4af" radius={[4, 4, 0, 0]} className="fill-primary/40" />
      </BarChart>
    </ResponsiveContainer>
  )
}
