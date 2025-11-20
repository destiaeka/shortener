import { NextResponse } from "next/server"
import { getAllUrls } from "@/lib/db"

export async function GET() {
  try {
    const urls = getAllUrls()

    return NextResponse.json(
      urls.map((item) => ({
        ...item,
        shortUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/${item.shortId}`,
      })),
    )
  } catch (error) {
    console.error("Get URLs error:", error)
    return NextResponse.json({ error: "Failed to fetch URLs" }, { status: 500 })
  }
}
