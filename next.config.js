/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.unsplash.com',
      'img.clerk.com',
      'uploadthing.com',
      'utfs.io',
      'randomuser.me'
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

    // Optimize SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    // Add fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      dns: false,
      child_process: false,
      os: false,
    };

    return config;
  },
  // Transpile specific modules
  transpilePackages: [],
  // Enable experimental features
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001'],
    },
    optimizeCss: true,
    scrollRestoration: true,
    turbo: {
      loaders: {
        '.svg': ['@svgr/webpack'],
      },
      resolveAlias: {
        // Add any aliases you have in webpack config
      },
    },
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
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=31536000',
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
  // Compression
  compress: true,
  // Powered by header
  poweredByHeader: false,
  // Production source maps
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig; 