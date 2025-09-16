import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'personal-branding-builder-v2.vercel.app',
    '192.168.0.117',        // tanpa protocol dan port
    '127.0.0.1',            // kalau akses lewat IP di lokal
    'localhost'             // default
  ],
  images: {
    domains: ["img.youtube.com"],
  },
};

export default nextConfig;