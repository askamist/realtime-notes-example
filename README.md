# Notes Frontend

## Prerequisites
- Node.js (v16+)
- pnpm
- Clerk account

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

Required environment variables:
```env
VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
VITE_API_URL="http://localhost:3000"
```

3. Start development server:
```bash
pnpm dev
```

App runs at `http://localhost:5173`

## Features
- 🔐 Authentication with Clerk
- 📝 Rich text editing
- 🤝 Note sharing
- 🏷️ Auto-tagging with Gemini AI
- 👥 Team collaboration
