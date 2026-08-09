# 🔗 TinyLink  
A fast and reliable URL shortener with built-in click analytics — built using **Next.js, Prisma, PostgreSQL (Neon)** and deployed on **Vercel**.

---

## 🚀 Live Demo  
👉 https://tiny-link-xi-sandy.vercel.app/

---

## ✨ Features
- Shorten long URLs instantly  
- Custom short codes  
- Redirect with click tracking  
- Analytics page for each link  
- Delete links  
- Responsive dashboard UI  
- CRUD API routes  
- Health check endpoint  
- Edge-fast redirects  

---

## 📊 Routes Overview

| Route | Description |
|-------|-------------|
| `/` | Dashboard — Create, List, Copy, Delete links |
| `/stats/[code]` | Analytics page showing clicks & stats |
| `/[code]` | Public redirect to original URL |
| `/api/links` | API for CRUD operations |
| `/healthz` | Health check endpoint |

---

## 🧱 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Frontend | React, Tailwind CSS |
| Backend | Next.js Route Handlers |
| Database | Neon PostgreSQL |
| ORM | Prisma |
| Deployment | Vercel |
| Utilities | Zod, UUID |

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

```
# Project Structure

tiny-link/
│
├── app/
│   ├── api/
│   │   └── links/        → CRUD API handlers
│   ├── stats/            → Analytics pages
│   ├── [code]/           → Redirect logic
│   └── page.tsx          → Dashboard
│
├── prisma/
│   └── schema.prisma     → DB schema
│
├── components/           → UI components
├── lib/                  → Prisma client, utils
├── styles/               → Global styles
└── package.json

```

```
Local Development
git clone https://github.com/YOUR-USERNAME/tiny-link.git
cd tiny-link

-npm install


Create .env:

-DATABASE_URL="YOUR_POSTGRES_DATABASE_URL"


Run migrations:

-npx prisma migrate dev --name init


Start dev server:

-npm run dev

```
.
```
👤 Developer

Dev Manish
https://devmanish.com
```
