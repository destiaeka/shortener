# URL Shortener

A simple and fast URL shortener built with Next.js and SQLite.

## Features

- Shorten long URLs into short, memorable links
- View all created shortened URLs
- Copy shortened URLs to clipboard
- Automatic redirect from short URL to original URL
- Local SQLite database (no cloud required)
- Modern, responsive UI

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd url-shortener
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Initialize the database**
   \`\`\`bash
   npm run init-db
   \`\`\`

## Running the Application

**Development mode:**
\`\`\`bash
npm run dev
\`\`\`

The application will start at `http://localhost:3000`

**Production mode:**
\`\`\`bash
npm run build
npm start
\`\`\`

## Usage

1. Open `http://localhost:3000` in your browser
2. Paste a long URL into the input field
3. Click "Generate Short Link"
4. Copy the generated short URL
5. Share the short URL - it will redirect to the original URL

## Project Structure

\`\`\`
url-shortener/
├── app/
│   ├── page.tsx              # Main page with form and list
│   ├── api/
│   │   ├── shorten/route.ts  # POST endpoint to create short URLs
│   │   └── urls/route.ts     # GET endpoint to list all URLs
│   ├── [shortId]/
│   │   └── route.ts          # Dynamic route for redirects
│   └── globals.css           # Global styles
├── components/
│   ├── url-form.tsx          # URL input form
│   ├── url-list.tsx          # List of shortened URLs
│   └── copy-button.tsx       # Copy to clipboard button
├── lib/
│   └── db.ts                 # Database operations
├── scripts/
│   └── init-db.ts            # Database initialization
├── urls.db                   # SQLite database (created on first run)
└── README.md
\`\`\`

## API Endpoints

### POST /api/shorten
Create a new shortened URL

**Request:**
\`\`\`json
{
  "url": "https://example.com/very/long/url"
}
\`\`\`

**Response:**
\`\`\`json
{
  "shortId": "abc123",
  "originalUrl": "https://example.com/very/long/url",
  "shortUrl": "http://localhost:3000/abc123",
  "createdAt": "2025-11-20T10:00:00Z"
}
\`\`\`

### GET /api/urls
List all shortened URLs

**Response:**
\`\`\`json
[
  {
    "id": 1,
    "shortId": "abc123",
    "originalUrl": "https://example.com/very/long/url",
    "shortUrl": "http://localhost:3000/abc123",
    "createdAt": "2025-11-20T10:00:00Z"
  }
]
\`\`\`

### GET /:shortId
Redirect to original URL (HTTP 301 redirect)

## Database

The application uses SQLite with the following schema:

\`\`\`sql
CREATE TABLE urls (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  shortId TEXT UNIQUE NOT NULL,
  originalUrl TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

The database file (`urls.db`) is automatically created in the project root on first run.

## Environment Variables

Optional: Create a `.env.local` file to customize the app URL (for production):

\`\`\`
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

## Technologies

- **Framework:** Next.js 16
- **Database:** SQLite with better-sqlite3
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Runtime:** Node.js

## License

MIT
