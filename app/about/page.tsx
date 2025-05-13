import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "../components/navbar"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Globe, CheckCircle } from "lucide-react"

// Technology stack with categories
const technologies = {
  frontend: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  backend: ["RESTful API", "HTTPS Support", "Proxy Handling"],
  ai: ["Convolutional Neural Network (CNN)", "Image Classification", "Confidence Scoring"],
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About Flower Classifier</h1>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <p className="text-muted-foreground mb-4">
                Flower Classifier is an AI-powered application that helps you identify different types of flowers from
                images. Whether you're a botanist, gardener, or just curious about the flowers you encounter, our tool
                can help you quickly identify flower species with high accuracy.
              </p>
              <p className="text-muted-foreground mb-4">
                Simply upload an image or provide a URL to an image of a flower, and our advanced machine learning model
                will analyze it and tell you what type of flower it is, along with a confidence score.
              </p>
              <div className="mt-6">
                <Link href="/">
                  <Button className="flex items-center gap-2">
                    Try It Now <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop&q=80"
                alt="Colorful flowers"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-md transition-all duration-200 hover:translate-y-[-5px]">
              <CardHeader>
                <CardTitle>1. Upload or URL</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Upload an image from your device or provide a URL to an online image of a flower you want to identify.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-200 hover:translate-y-[-5px]">
              <CardHeader>
                <CardTitle>2. AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our machine learning model analyzes the image, identifying key features and patterns that distinguish
                  different flower species.
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-200 hover:translate-y-[-5px]">
              <CardHeader>
                <CardTitle>3. Get Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Receive the classification result showing the flower type and a confidence score indicating the
                  reliability of the prediction.
                </p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">Technology</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {technologies.frontend.map((tech, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {technologies.backend.map((tech, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 bg-purple-500 rounded-full"></span>
                  AI & ML
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {technologies.ai.map((tech, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-500 flex-shrink-0" />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mb-12">
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>Supported Flowers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {["Lilly", "Lotus", "Orchid", "Sunflower", "Tulip"].map((flower) => (
                    <div
                      key={flower}
                      className="text-center p-3 bg-muted/40 rounded-lg hover:bg-muted transition-colors"
                    >
                      {flower}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Website
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
