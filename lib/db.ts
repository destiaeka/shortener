import Database from "better-sqlite3"
import path from "path"

const dbPath = path.join(process.cwd(), "urls.db")

function initializeDb() {
  const db = new Database(dbPath)

  db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      shortId TEXT UNIQUE NOT NULL,
      originalUrl TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `)

  return db
}

export function getDb() {
  return initializeDb()
}

export function generateShortId(): string {
  return Math.random().toString(36).substring(2, 8)
}

export interface UrlEntry {
  id: number
  shortId: string
  originalUrl: string
  createdAt: string
}

export function shortenUrl(originalUrl: string): UrlEntry {
  const db = getDb()
  let shortId = generateShortId()

  // Ensure shortId is unique
  while (db.prepare("SELECT id FROM urls WHERE shortId = ?").get(shortId)) {
    shortId = generateShortId()
  }

  const stmt = db.prepare("INSERT INTO urls (shortId, originalUrl) VALUES (?, ?)")
  const result = stmt.run(shortId, originalUrl)

  return {
    id: result.lastInsertRowid as number,
    shortId,
    originalUrl,
    createdAt: new Date().toISOString(),
  }
}

export function getOriginalUrl(shortId: string): string | null {
  const db = getDb()
  const result = db.prepare("SELECT originalUrl FROM urls WHERE shortId = ?").get(shortId) as
    | { originalUrl: string }
    | undefined
  return result?.originalUrl || null
}

export function getAllUrls(): UrlEntry[] {
  const db = getDb()
  return db.prepare("SELECT id, shortId, originalUrl, createdAt FROM urls ORDER BY createdAt DESC").all() as UrlEntry[]
}
