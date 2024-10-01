/** @type {import('next').NextConfig} */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const nextConfig = {
  reactStrictMode: false,
  env: {
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    ACCESS_KEY_PASSWORD: process.env.ACCESS_KEY_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
  },
  webpack: (config, { isServer }) => {
    // Add polyfills only for client-side code
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Since 'fs' is server-side only, we explicitly disable it
        net: false, // Disabling unnecessary modules for client-side
        tls: false,
        crypto: require.resolve("crypto-browserify"),
      };

      // Apply the NodePolyfillPlugin
      config.plugins.push(new NodePolyfillPlugin());
    }

    return config;
  }
  
};

if (process.env.NODE_ENV === 'development') {
  // Dynamic import for development setup
  import('@cloudflare/next-on-pages/next-dev').then(({ setupDevPlatform }) => {
    setupDevPlatform();
  });
}

module.exports = nextConfig;