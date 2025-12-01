# 🔗 TinyLink  
A fast, simple, and reliable URL shortener with built-in click analytics — built for production use.  
Developed using **Next.js 16**, **Prisma**, **PostgreSQL (Neon)**, and deployed on **Vercel**.

---

## 🚀 Live Demo  
👉 https://tiny-link-xi-sandy.vercel.app/

---

## ✨ Features

- Shorten any long URL in one click  
- Custom short code support  
- Real-time click tracking  
- Analytics per link  
- Delete links anytime  
- Responsive dashboard interface  
- API routes for CRUD operations  
- Health check endpoint for monitoring  
- Ultra-fast redirects (Edge-optimized)

---

## 📊 Pages Overview

| Route | Purpose |
|-------|---------|
| `/` | Dashboard – Create, List, Copy, and Delete short links |
| `/stats/[code]` | Analytics & click history for each short link |
| `/[code]` | Public redirect to the original URL |
| `/api/links` | CRUD API for links |
| `/healthz` | Health check endpoint |

---

## 🧱 Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Frontend** | React, Tailwind CSS |
| **Backend** | Next.js Route Handlers |
| **Database** | Neon PostgreSQL |
| **ORM** | Prisma |
| **Hosting** | Vercel |
| **Utilities** | Zod validation, UUID |

---

## 🗄️ Database Schema (Prisma)

```prisma
model Link {
  id          String   @id @default(uuid())
  code        String   @unique
  url         String
  clicks      Int      @default(0)
  lastClicked DateTime?
  createdAt   DateTime @default(now())
}

```
🏗️ Project Structure
pgsql
Copy code
tiny-link/
│
├── app/
│   ├── api/
│   │   └── links/        → CRUD API handlers
│   ├── stats/            → Analytics pages
│   ├── [code]/           → Public redirect logic
│   └── page.tsx          → Main dashboard
│
├── prisma/
│   └── schema.prisma     → Database schema
│
├── components/           → UI components
├── lib/                  → Prisma client, utilities
├── styles/               → Global styles
└── package.json
🔧 Local Development
1️⃣ Clone repository
sh
Copy code
git clone https://github.com/YOUR-USERNAME/tiny-link.git
cd tiny-link
2️⃣ Install dependencies
sh
Copy code
npm install
3️⃣ Create .env file
sh
Copy code
DATABASE_URL="YOUR_POSTGRES_DATABASE_URL"
4️⃣ Push/migrate database
sh
Copy code
npx prisma migrate dev --name init
5️⃣ Start development server
sh
Copy code
npm run dev
🧪 API Overview
POST /api/links
Create a new short link.

GET /api/links
Fetch all links.

DELETE /api/links?id=...
Delete a link.

GET /[code]
Redirect to the target URL + increment click count.

❤️ Built For
This project was developed as a company-ready utility, focusing on:

reliability

speed

clean dashboard experience

analytics accuracy

maintainable codebase

📄 License
This project is provided for demonstration and company internal usage.

👨‍💻 Developed By
Dev Manish
Frontend Developer – Portfolio: https://devmanish.com
