"use client"
import CopyButton from "./copy-button"

interface UrlItem {
  id: number
  shortId: string
  originalUrl: string
  shortUrl: string
  createdAt: string
}

export default function UrlList({ urls, onDelete }: { urls: UrlItem[]; onDelete: () => void }) {
  return (
    <div className="space-y-3">
      {urls.map((item) => (
        <div
          key={item.shortId}
          className="bg-card border border-border rounded-lg p-4 hover:border-primary/50 transition-colors"
        >
          <div className="space-y-2">
            {/* Short URL */}
            <div className="flex items-center justify-between gap-2">
              <a
                href={item.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-mono font-semibold hover:underline truncate"
              >
                {item.shortUrl.replace("http://", "").replace("https://", "")}
              </a>
              <CopyButton text={item.shortUrl} />
            </div>

            {/* Original URL */}
            <div className="text-sm text-muted-foreground break-all">{item.originalUrl}</div>

            {/* Created Date */}
            <div className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
