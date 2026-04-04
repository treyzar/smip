import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, IBM_Plex_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth"
import "./globals.css"

const _inter = Inter({ subsets: ["latin", "cyrillic"] })
const _ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"]
})

export const metadata: Metadata = {
  title: "SMIP — Social Media Intelligence Platform",
  description:
    "AI-powered social media automation and intelligence platform. Automated publishing, AI analytics, audience insights for 2026.",
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#1a1f2e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body className={`font-sans antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
