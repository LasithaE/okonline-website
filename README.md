# OK Online

A Next.js website ready for deployment on Vercel.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

### Option 1: Deploy via GitHub (Recommended)

1. Push this code to GitHub (already done!)
2. Go to [Vercel](https://vercel.com/new)
3. Import your GitHub repository: `LasithaE/okonline-website`
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

Your site will be live in seconds with automatic HTTPS and global CDN!

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts, and your site will be deployed instantly.

## Project Structure

```
okonline/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx          (All pages in one file - SPA style)
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Features

- 🏠 **Home Page** - Hero section, problem/solution, stats, services preview
- 👥 **About Page** - Company story, values, team
- 💼 **Services Page** - Meta Ads, WhatsApp Marketing, Email Marketing
- 📧 **Contact Page** - Contact form with validation
- ✨ **Animations** - Smooth scroll animations and floating shapes
- 📱 **Fully Responsive** - Works perfectly on all devices

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
