import { type NextRequest, NextResponse } from "next/server"
import { shortenUrl } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Basic URL validation
    try {
      new URL(url)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    const result = shortenUrl(url)

    return NextResponse.json({
      shortId: result.shortId,
      originalUrl: result.originalUrl,
      shortUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/${result.shortId}`,
      createdAt: result.createdAt,
    })
  } catch (error) {
    console.error("Shorten error:", error)
    return NextResponse.json({ error: "Failed to shorten URL" }, { status: 500 })
  }
}
