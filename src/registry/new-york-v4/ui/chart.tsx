"use client"

import React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"

export function ChartContainer({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export const ChartTooltip = Tooltip

export function ChartTooltipContent({ active, payload, label }: any) {
  if (active && payload?.length) {
    return (
      <div className="rounded-lg border bg-white p-2 shadow-sm">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="font-bold">{payload[0].value}</div>
      </div>
    )
  }
  return null
}
