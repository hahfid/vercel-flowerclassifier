"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, LinkIcon, Bug, AlertTriangle } from "lucide-react"
import Image from "next/image"
import { API_CONFIG } from "./config/api"
import { DebugPanel } from "./components/debug-panel"
import { Navbar } from "./components/navbar"
import { ThemeIndicator } from "./components/theme-indicator"

// Sample flower images for demo purposes
const SAMPLE_IMAGES = [
  {
    name: "Sunflower",
    url: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=500&q=80",
  },
  {
    name: "Tulip",
    url: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8VHVsaXB8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Orchid",
    url: "https://images.unsplash.com/photo-1605996370592-b6f7a81e382e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8T3JjaGlkfGVufDB8fDB8fHww",
  },
]

export default function FlowerClassifier() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState("")
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [urlPreview, setUrlPreview] = useState<string | null>(null)
  const [result, setResult] = useState<{
    class?: string
    confidence?: number
    note?: string
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDebug, setShowDebug] = useState(false)
  const [usingSampleImage, setUsingSampleImage] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
      setResult(null)
      setError(null)
      setUsingSampleImage(false)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value)
    setUrlPreview(null)
    setResult(null)
    setError(null)
  }

  const previewUrl = () => {
    if (imageUrl) {
      setUrlPreview(imageUrl)
    }
  }

  const selectSampleImage = (sampleImage: (typeof SAMPLE_IMAGES)[0]) => {
    setImageUrl(sampleImage.url)
    setUrlPreview(sampleImage.url)
    setResult(null)
    setError(null)
    setUsingSampleImage(true)
  }

  const classifyByUpload = async () => {
    if (!file) return

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.upload}`
      console.log(`Sending request to: ${apiUrl}`)

      const response = await fetch(apiUrl, {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        setError(`Error: ${data.error || "Unknown error"}`)
        console.error("Error response:", data)
      }
    } catch (error) {
      console.error("Detailed fetch error:", error)
      setError(`Network error: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setLoading(false)
    }
  }

  const classifyByUrl = async () => {
    if (!imageUrl) return

    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const apiUrl = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.url}`
      console.log(`Sending request to: ${apiUrl}`)

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: imageUrl }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        setError(`Error: ${data.error || "Unknown error"}`)
        console.error("Error response:", data)
      }
    } catch (error) {
      setError(`Network error: ${error instanceof Error ? error.message : "Unknown error"}`)
      console.error("Error classifying image:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto py-10 px-4">
          <div className="flex flex-col items-center justify-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Flower Classification</h1>
            <p className="text-muted-foreground text-center max-w-md">
              Upload an image or provide a URL to identify the type of flower with our AI-powered classifier.
            </p>
          </div>

          <Tabs defaultValue="upload" className="max-w-2xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
              <TabsTrigger value="url">Image URL</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>Upload an Image</CardTitle>
                  <CardDescription>Upload a flower image to classify its type</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="image">Image</Label>
                    <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
                  </div>

                  {imagePreview && (
                    <div className="mt-4 relative aspect-square w-full max-w-sm mx-auto border rounded-md overflow-hidden hover:border-primary/50 transition-colors">
                      <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={classifyByUpload} disabled={!file || loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Classifying...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Classify Flower
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="url">
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>Image URL</CardTitle>
                  <CardDescription>Enter the URL of a flower image to classify</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="url">Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="url"
                        type="url"
                        placeholder="https://example.com/flower.jpg"
                        value={imageUrl}
                        onChange={handleUrlChange}
                      />
                      <Button variant="outline" onClick={previewUrl} disabled={!imageUrl}>
                        Preview
                      </Button>
                    </div>
                  </div>

                  {urlPreview && (
                    <div className="mt-4 relative aspect-square w-full max-w-sm mx-auto border rounded-md overflow-hidden hover:border-primary/50 transition-colors">
                      <Image src={urlPreview || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
                    </div>
                  )}

                  {/* Sample images section */}
                  <div className="mt-6">
                    <h3 className="text-sm font-medium mb-2">Or try one of these sample images:</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {SAMPLE_IMAGES.map((sample, index) => (
                        <div
                          key={index}
                          className="cursor-pointer border rounded-md overflow-hidden hover:border-pink-300 dark:hover:border-pink-700 transition-all duration-200 hover:shadow-md hover:scale-105"
                          onClick={() => selectSampleImage(sample)}
                        >
                          <div className="relative aspect-square">
                            <Image
                              src={sample.url || "/placeholder.svg"}
                              alt={sample.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-1 text-center text-xs">{sample.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={classifyByUrl} disabled={!imageUrl || loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Classifying...
                      </>
                    ) : (
                      <>
                        <LinkIcon className="mr-2 h-4 w-4" />
                        Classify Flower
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="max-w-2xl mx-auto mt-8">
              <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900 hover:shadow-md transition-all duration-200">
                <CardContent className="pt-6">
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {result && result.class && (
            <div className="max-w-2xl mx-auto mt-8">
              <Card className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-pink-200 dark:border-pink-900 hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle className="text-center">Classification Result</CardTitle>
                  {result.note && (
                    <div className="flex items-center justify-center gap-2 mt-2 p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded-md">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">{result.note}</p>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="text-center">
                      <h3 className="text-3xl font-bold text-pink-600 dark:text-pink-400">{result.class}</h3>
                      <p className="text-muted-foreground">Confidence: {result.confidence?.toFixed(1)}%</p>
                    </div>

                    <div className="w-full max-w-xs bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-pink-600 dark:bg-pink-500 h-2.5 rounded-full"
                        style={{ width: `${result.confidence || 0}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          

         
        </div>
      </main>
      <ThemeIndicator />
    </div>
  )
}
