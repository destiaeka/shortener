"use client"

import { useState, useEffect } from "react"
import UrlForm from "@/components/url-form"
import UrlList from "@/components/url-list"

interface UrlItem {
  id: number
  shortId: string
  originalUrl: string
  shortUrl: string
  createdAt: string
}

export default function Home() {
  const [urls, setUrls] = useState<UrlItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUrls()
  }, [])

  const fetchUrls = async () => {
    try {
      const response = await fetch("/api/urls")
      const data = await response.json()
      setUrls(data)
    } catch (error) {
      console.error("Failed to fetch URLs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUrlCreated = async (newUrl: UrlItem) => {
    setUrls((prev) => [newUrl, ...prev])
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/5">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-2">Link Shortener</h1>
          <p className="text-lg text-muted-foreground">Create short, memorable links from long URLs</p>
        </div>

        {/* Form Section */}
        <div className="mb-12">
          <UrlForm onUrlCreated={handleUrlCreated} />
        </div>

        {/* List Section */}
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-6">Your Links</h2>
          {loading ? (
            <div className="text-center text-muted-foreground py-12">Loading your links...</div>
          ) : urls.length === 0 ? (
            <div className="text-center text-muted-foreground py-12 bg-card rounded-lg border border-border">
              No links created yet. Shorten your first URL!
            </div>
          ) : (
            <UrlList urls={urls} onDelete={() => fetchUrls()} />
          )}
        </div>
      </div>
    </main>
  )
}
