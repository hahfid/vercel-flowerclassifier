// Sample flower classifications for testing
const SAMPLE_FLOWERS = [
  { class: "Rose", confidence: 95.7 },
  { class: "Tulip", confidence: 88.3 },
  { class: "Sunflower", confidence: 92.1 },
  { class: "Daisy", confidence: 89.5 },
  { class: "Lily", confidence: 91.2 },
  { class: "Orchid", confidence: 94.8 },
]

// Mock API implementation
export const mockApi = {
  // Simulate classifying an image from a file
  classifyImage: async (file: File): Promise<{ class: string; confidence: number }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Return a random flower classification
    return SAMPLE_FLOWERS[Math.floor(Math.random() * SAMPLE_FLOWERS.length)]
  },

  // Simulate classifying an image from a URL
  classifyUrl: async (url: string): Promise<{ class: string; confidence: number }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Return a random flower classification
    return SAMPLE_FLOWERS[Math.floor(Math.random() * SAMPLE_FLOWERS.length)]
  },
}
