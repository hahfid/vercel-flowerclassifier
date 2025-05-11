// API configuration with your specific domain
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://47.84.53.222",
  endpoints: {
    upload: "/predict/upload",
    url: "/predict/url",
  },
}
