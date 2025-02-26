/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'images.unsplash.com',
      'img.clerk.com',
      'uploadthing.com',
      'utfs.io'
    ],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable webpack analyzer in production build
  webpack: (config, { isServer, dev }) => {
    // Only run in production build
    if (!dev && !isServer) {
      // Add bundle analyzer only when ANALYZE=true
      if (process.env.ANALYZE === 'true') {
        // Use dynamic import instead of require
        import('webpack-bundle-analyzer').then((module) => {
          const BundleAnalyzerPlugin = module.BundleAnalyzerPlugin;
          config.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: 'server',
              analyzerPort: 8888,
              openAnalyzer: true,
            })
          );
        });
      }
    }
    return config;
  },
  // Transpile specific modules
  transpilePackages: [],
  // Enable experimental features
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: [],
  },
  // Headers for security and caching
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Redirects
  redirects: async () => {
    return [];
  },
  // Rewrites
  rewrites: async () => {
    return [];
  },
};

module.exports = nextConfig; 