import { type NextRequest, NextResponse } from "next/server"
import { getOriginalUrl } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ shortId: string }> }) {
  try {
    const { shortId } = await params
    const originalUrl = getOriginalUrl(shortId)

    if (!originalUrl) {
      return NextResponse.json({ error: "Short URL not found" }, { status: 404 })
    }

    // Redirect to original URL
    return NextResponse.redirect(originalUrl, { status: 301 })
  } catch (error) {
    console.error("Redirect error:", error)
    return NextResponse.json({ error: "Failed to redirect" }, { status: 500 })
  }
}
