"use client"

import { useState } from "react"

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="px-3 py-1 bg-secondary text-secondary-foreground text-sm font-medium rounded-md hover:bg-secondary/80 transition-colors whitespace-nowrap"
    >
      {copied ? "✓ Copied" : "Copy"}
    </button>
  )
}
