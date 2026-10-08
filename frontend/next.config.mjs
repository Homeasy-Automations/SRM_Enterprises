/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 750, 828, 1080, 1200, 1600, 1920, 2560],
  },
  eslint: {
    dirs: ["app", "components", "data", "hooks", "lib"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  /**
   * Optional same-origin API proxy.
   * Set API_PROXY_TARGET (e.g. http://localhost:5000 or https://api.your-domain.com) and
   * browser calls to /api/* are proxied server-side. Leave it unset when the API already
   * lives on the same domain behind a reverse proxy, or when NEXT_PUBLIC_API_URL points
   * straight at the API host.
   */
  async rewrites() {
    const target = (process.env.API_PROXY_TARGET ?? "").trim().replace(/\/+$/, "");
    if (!target) return [];
    return [{ source: "/api/:path*", destination: `${target}/api/:path*` }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
