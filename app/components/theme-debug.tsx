"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ThemeDebug() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Theme Debug</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Current theme:</strong> {theme}
          </p>
          <p>
            <strong>Resolved theme:</strong> {resolvedTheme}
          </p>
          <div className="flex gap-2 mt-4">
            <button onClick={() => setTheme("light")} className="px-3 py-1 bg-blue-500 text-white rounded-md">
              Light
            </button>
            <button onClick={() => setTheme("dark")} className="px-3 py-1 bg-blue-500 text-white rounded-md">
              Dark
            </button>
            <button onClick={() => setTheme("system")} className="px-3 py-1 bg-blue-500 text-white rounded-md">
              System
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
