# SRM Enterprises — Backend API (Express + TypeScript)

Standalone Express + Mongoose + Resend API backend for SRM Enterprises.

## 🚀 Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   Create `.env` (or copy from `.env.example`):
   ```env
   PORT=5001
   NODE_ENV=development
   MONGODB_URI=your_mongodb_connection_string
   CLIENT_URL=http://localhost:3000,http://127.0.0.1:3000
   RESEND_API_KEY=your_resend_api_key
   RESEND_FROM_EMAIL=SRM Enterprises <noreply@yourdomain.com>
   CONTACT_RECEIVER_EMAIL=sales@yourdomain.com
   IP_HASH_SALT=your_random_salt_string_at_least_8_chars
   LOG_LEVEL=info
   TRUST_PROXY=1
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   API will listen on [http://localhost:5001](http://localhost:5001).

4. **Verify health check:**
   Open [http://localhost:5001/api/health](http://localhost:5001/api/health) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## 🌐 Deploying Backend (Render / Railway / Fly.io / VPS)

This backend is completely self-contained with zero monorepo dependencies.

### Deploying to Render / Railway:
1. Connect your repository.
2. In service settings:
   - **Root Directory:** `backend` (if keeping inside this repo) or `.` (if in a separate repo).
   - **Environment:** Node.js
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
3. In **Environment Variables**, provide:
   - `PORT`: `5000` (or leave to host default if platform supplies `$PORT`)
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `CLIENT_URL`: Your production frontend URL (e.g., `https://www.yourdomain.com`)
   - `RESEND_API_KEY`: Your Resend API key
   - `RESEND_FROM_EMAIL`: `SRM Enterprises <noreply@yourdomain.com>`
   - `CONTACT_RECEIVER_EMAIL`: Sales email address
   - `IP_HASH_SALT`: A random secret string (8+ chars)
4. Click **Deploy**.
