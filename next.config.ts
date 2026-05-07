import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations TypeScript et Linting
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  eslint: {
    dirs: ["app", "components", "lib", "utils", "server"],
  },

  // Images optimisées
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "**.supabase.co" }, // Supabase storage
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression et optimisations
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,

  // Headers de sécurité
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects (optionnel)
  async redirects() {
    return [];
  },

  // Rewrites (optionnel)
  async rewrites() {
    return [];
  },

  // Webpack config (optionnel)
  webpack: (config) => {
    config.module.rules.push({
      test: /.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
