"use client"

import type React from "react"

import { useState } from "react"

interface UrlItem {
  id: number
  shortId: string
  originalUrl: string
  shortUrl: string
  createdAt: string
}

export default function UrlForm({ onUrlCreated }: { onUrlCreated: (url: UrlItem) => void }) {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to shorten URL")
        return
      }

      onUrlCreated(data)
      setUrl("")
    } catch (err) {
      setError("Failed to shorten URL. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="url"
          placeholder="https://example.com/very/long/url/that/needs/shortening"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
        />
      </div>

      {error && (
        <div className="text-sm text-destructive bg-destructive/10 px-4 py-3 rounded-lg border border-destructive/20">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {loading ? "Generating..." : "Generate Short Link"}
      </button>
    </form>
  )
}
