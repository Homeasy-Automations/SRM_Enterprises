# SRM Enterprises — Frontend (Next.js)

Standalone Next.js App Router frontend for the SRM Enterprises website.

## 🚀 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Create `.env.local` (or copy from `.env.example`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
   NEXT_PUBLIC_PHONE_NUMBER=+91 98765 43210
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build & Test:**
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Deploying Frontend (Vercel / Netlify / Cloudflare)

This frontend is completely self-contained with zero monorepo dependencies.

### Deploying to Vercel:
1. Connect your Git repository in Vercel.
2. In **Project Settings**:
   - **Root Directory:** `frontend` (if keeping inside this repo) or `.` (if in a separate repo).
   - **Framework Preset:** Next.js.
   - **Build Command:** `next build` (default).
   - **Output Directory:** `.next` (default).
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend API URL (e.g., `https://api.yourdomain.com` or `https://your-api.onrender.com`).
   - `NEXT_PUBLIC_SITE_URL`: Your frontend URL (e.g., `https://www.yourdomain.com`).
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`: (e.g., `919876543210`).
   - `NEXT_PUBLIC_PHONE_NUMBER`: (e.g., `+91 98765 43210`).
4. Click **Deploy**.
