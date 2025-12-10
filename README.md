# OK Online

A Next.js website ready for deployment on Netlify.

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

## Deploy on Netlify

### Option 1: Deploy via GitHub

1. Push this code to GitHub:
   ```bash
   git add .
   git commit -m "Initial Next.js setup"
   git push origin master
   ```

2. Go to [Netlify](https://app.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Choose GitHub and select your repository
5. Netlify will auto-detect Next.js settings
6. Click "Deploy"

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

## Project Structure

```
okonline/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── .gitignore
├── netlify.toml
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
