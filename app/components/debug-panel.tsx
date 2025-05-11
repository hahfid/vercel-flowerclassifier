"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DebugPanel() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testUploadEndpoint = async () => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      // Create a simple test image
      const canvas = document.createElement("canvas")
      canvas.width = 100
      canvas.height = 100
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "red"
        ctx.fillRect(0, 0, 100, 100)
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"))

      if (!blob) {
        throw new Error("Failed to create test image")
      }

      // Create form data with the test image
      const formData = new FormData()
      formData.append("file", blob, "test-image.png")

      // Test the proxy endpoint first
      try {
        const proxyResponse = await fetch("/api/proxy/upload", {
          method: "POST",
          body: formData,
        })

        const proxyData = await proxyResponse.text()
        setResult(
          `Proxy Endpoint Test:\nStatus: ${proxyResponse.status} ${proxyResponse.statusText}\n\nResponse:\n${proxyData}`,
        )
      } catch (proxyError) {
        setResult(`Proxy Endpoint Error: ${proxyError instanceof Error ? proxyError.message : "Unknown error"}`)
      }
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const testMockApi = async () => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      // Create a simple test image
      const canvas = document.createElement("canvas")
      canvas.width = 100
      canvas.height = 100
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.fillStyle = "blue"
        ctx.fillRect(0, 0, 100, 100)
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"))

      if (!blob) {
        throw new Error("Failed to create test image")
      }

      // Create a file from the blob
      const file = new File([blob], "test-image.png", { type: "image/png" })

      // Import the mock API
      const { mockApi } = await import("@/app/utils/mock-api")

      // Test the mock API
      const mockResult = await mockApi.classifyImage(file)
      setResult(`Mock API Test:\n\nResponse:\n${JSON.stringify(mockResult, null, 2)}`)
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const checkConnectivity = async () => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const results = []

      // Check if we can reach the API server (just a HEAD request)
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch("https://47.84.53.222", {
          method: "HEAD",
          signal: controller.signal,
        })

        clearTimeout(timeoutId)
        results.push(`API Server: ${response.status} ${response.statusText}`)
      } catch (error) {
        results.push(`API Server: Failed - ${error instanceof Error ? error.message : "Unknown error"}`)
      }

      // Check if we can reach a public API
      try {
        const response = await fetch("https://httpbin.org/get")
        results.push(`Public API: ${response.status} ${response.statusText}`)
      } catch (error) {
        results.push(`Public API: Failed - ${error instanceof Error ? error.message : "Unknown error"}`)
      }

      setResult(`Connectivity Test:\n\n${results.join("\n")}`)
    } catch (error) {
      setError(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mt-8 bg-gray-50">
      <CardHeader>
        <CardTitle>API Debug Panel</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="test">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="test">Test API</TabsTrigger>
            <TabsTrigger value="mock">Test Mock</TabsTrigger>
            <TabsTrigger value="connectivity">Check Connectivity</TabsTrigger>
          </TabsList>

          <TabsContent value="test" className="space-y-4">
            <Button onClick={testUploadEndpoint} disabled={loading} variant="outline">
              Test Upload Endpoint
            </Button>
          </TabsContent>

          <TabsContent value="mock" className="space-y-4">
            <Button onClick={testMockApi} disabled={loading} variant="outline">
              Test Mock API
            </Button>
          </TabsContent>

          <TabsContent value="connectivity" className="space-y-4">
            <Button onClick={checkConnectivity} disabled={loading} variant="outline">
              Check Network Connectivity
            </Button>
          </TabsContent>
        </Tabs>

        {loading && <p className="mt-4">Running test...</p>}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 whitespace-pre-wrap">{error}</p>
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-200 rounded-md">
            <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
