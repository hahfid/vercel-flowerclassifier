import { NextResponse } from "next/server"
import { mockApi } from "@/app/utils/mock-api"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    // Check if we have a file
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("Attempting to connect to API server...")

    try {
      // Try to connect to the real API with a timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 5 second timeout

      const response = await fetch("http://47.84.53.222/predict/upload", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      // Process the response
      if (response.ok) {
        const contentType = response.headers.get("content-type") || ""

        if (contentType.includes("application/json")) {
          const data = await response.json()
          return NextResponse.json(data)
        } else {
          const text = await response.text()
          console.log("API returned non-JSON response:", text)

          // Fall back to mock API
          console.log("Falling back to mock API...")
          const mockResult = await mockApi.classifyImage(file)
          return NextResponse.json({
            ...mockResult,
            note: "Using mock data because the API returned a non-JSON response",
          })
        }
      } else {
        const text = await response.text()
        console.log("API returned error:", response.status, text)

        // Fall back to mock API
        console.log("Falling back to mock API...")
        const mockResult = await mockApi.classifyImage(file)
        return NextResponse.json({
          ...mockResult,
          note: "Using mock data because the API returned an error",
        })
      }
    } catch (error) {
      console.error("Error connecting to API:", error)

      // Fall back to mock API
      console.log("Falling back to mock API...")
      const mockResult = await mockApi.classifyImage(file)
      return NextResponse.json({
        ...mockResult,
        note: "Using mock data because the API connection failed",
      })
    }
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json(
      { error: `Failed to process request: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
