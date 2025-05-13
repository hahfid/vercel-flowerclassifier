import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "../components/navbar"

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">API Documentation</h1>
          <p className="text-muted-foreground mb-8">
            This documentation describes the endpoints available for the Flower Classification API.
          </p>

          <Tabs defaultValue="upload">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="upload">Upload Endpoint</TabsTrigger>
              <TabsTrigger value="url">URL Endpoint</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>POST /predict/upload</CardTitle>
                  <CardDescription>Classifies a flower image uploaded as a file.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Request</h3>
                    <p className="mb-2">Content-Type: multipart/form-data</p>

                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted px-4 py-2 border-b">
                        <h4 className="font-medium">Request Body</h4>
                      </div>
                      <div className="p-4">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 pr-4">Field</th>
                              <th className="text-left py-2 pr-4">Type</th>
                              <th className="text-left py-2">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 pr-4 align-top">file</td>
                              <td className="py-2 pr-4 align-top">File</td>
                              <td className="py-2 align-top">
                                The image file of the flower to classify. It should be an image (JPEG, PNG, etc.).
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Response</h3>
                    <p className="mb-2">Status Code: 200 OK</p>
                    <p className="mb-2">Content-Type: application/json</p>

                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted px-4 py-2 border-b">
                        <h4 className="font-medium">Response Body</h4>
                      </div>
                      <div className="p-4">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          {`{
  "class": "Tulip",
  "confidence": 95.5
}`}
                        </pre>

                        <div className="mt-4">
                          <h5 className="font-medium mb-2">Explanation:</h5>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              <strong>class</strong>: The predicted class of the flower (e.g., Lilly, Lotus, Tulip,
                              etc.).
                            </li>
                            <li>
                              <strong>confidence</strong>: The confidence of the prediction in percentage (0-100%).
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Example</h3>
                    <div className="bg-muted p-4 rounded-md overflow-x-auto">
                      <pre className="text-sm">
                        {`// Using fetch in JavaScript
const formData = new FormData();
const fileInput = document.querySelector('input[type="file"]');
formData.append('file', fileInput.files[0]);

fetch('https://47.84.53.222/predict/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Prediction:', data.class);
  console.log('Confidence:', data.confidence);
})
.catch(error => console.error('Error:', error));`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="url">
              <Card>
                <CardHeader>
                  <CardTitle>POST /predict/url</CardTitle>
                  <CardDescription>Classifies a flower image by its URL.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Request</h3>
                    <p className="mb-2">Content-Type: application/json</p>

                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted px-4 py-2 border-b">
                        <h4 className="font-medium">Request Body</h4>
                      </div>
                      <div className="p-4">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          {`{
  "url": "https://example.com/path/to/flower.jpg"
}`}
                        </pre>

                        <table className="w-full mt-4">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2 pr-4">Field</th>
                              <th className="text-left py-2 pr-4">Type</th>
                              <th className="text-left py-2">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 pr-4 align-top">url</td>
                              <td className="py-2 pr-4 align-top">string</td>
                              <td className="py-2 align-top">URL pointing to the image of the flower to classify.</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Response</h3>
                    <p className="mb-2">Status Code: 200 OK</p>
                    <p className="mb-2">Content-Type: application/json</p>

                    <div className="border rounded-md overflow-hidden">
                      <div className="bg-muted px-4 py-2 border-b">
                        <h4 className="font-medium">Response Body</h4>
                      </div>
                      <div className="p-4">
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          {`{
  "class": "Orchid",
  "confidence": 88.3
}`}
                        </pre>

                        <div className="mt-4">
                          <h5 className="font-medium mb-2">Explanation:</h5>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>
                              <strong>class</strong>: The predicted class of the flower (e.g., Lilly, Lotus, Tulip,
                              etc.).
                            </li>
                            <li>
                              <strong>confidence</strong>: The confidence of the prediction in percentage (0-100%).
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Example</h3>
                    <div className="bg-muted p-4 rounded-md overflow-x-auto">
                      <pre className="text-sm">
                        {`// Using fetch in JavaScript
fetch('https://47.84.53.222/predict/url', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    url: 'https://example.com/path/to/flower.jpg'
  })
})
.then(response => response.json())
.then(data => {
  console.log('Prediction:', data.class);
  console.log('Confidence:', data.confidence);
})
.catch(error => console.error('Error:', error));`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  <li>The API only accepts HTTPS requests.</li>
                  <li>Maximum file size for uploads is 10MB.</li>
                  <li>Supported image formats: JPEG, PNG, WebP.</li>
                  <li>For URL-based classification, the image must be publicly accessible.</li>
                  <li>The API may return a 429 error if rate limits are exceeded.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
