# TinyLink 🔗  
A fast and simple URL shortener service with click analytics — built using **Next.js, Prisma, PostgreSQL (Neon)** and deployed on **Vercel**.

---

## 🚀 Live Demo  
🌍 https://tiny-link-xi-sandy.vercel.app/


---

## ✨ Features

| Feature | Status |
|--------|:------:|
| Shorten long URLs | ✔ |
| Custom short codes | ✔ |
| Redirect with click tracking | ✔ |
| View link analytics | ✔ |
| Delete links | ✔ |
| Responsive UI | ✔ |
| Health check endpoint | ✔ |

---

## 📊 Pages

| Route | Description |
|-------|-------------|
| `/` | Dashboard — Create, List, Copy, Delete links |
| `/stats/[code]` | Analytics page for each link |
| `/[code]` | Public redirect to original URL |
| `/api/links` | API for CRUD operations |
| `/healthz` | Health check endpoint |

---

## 🧱 Tech Stack

| Category | Tool |
|---------|-----|
| Frontend | Next.js 16 (App Router), React, Tailwind CSS |
| Backend | Next.js Route Handlers |
| Database | Neon PostgreSQL |
| ORM | Prisma |
| Hosting | Vercel |

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

## 🔧 Local Development
1️⃣ Clone repo
git clone https://github.com/YOUR-USERNAME/tiny-link.git

cd tiny-link

npm install

Create .env file:
DATABASE_URL="YOUR_POSTGRES_DATABASE_URL"

Setup database
npx prisma migrate dev --name init

npm run dev
