"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun, Monitor } from "lucide-react"

export function ThemeIndicator() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-background border border-border rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 shadow-md z-50 transition-theme">
      {theme === "dark" ? (
        <>
          <Moon className="h-3.5 w-3.5" />
          <span>Dark</span>
        </>
      ) : theme === "light" ? (
        <>
          <Sun className="h-3.5 w-3.5" />
          <span>Light</span>
        </>
      ) : (
        <>
          <Monitor className="h-3.5 w-3.5" />
          <span>System</span>
        </>
      )}
    </div>
  )
}
