import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.0.117',        // tanpa protocol dan port
    '127.0.0.1',            // kalau akses lewat IP di lokal
    'localhost'             // default
  ],
};

export default nextConfig;