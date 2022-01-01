const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();
const withTM = require('next-transpile-modules')([
  '@react-spring/three',
  '@react-spring/web',
]);

const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactRoot: true,
    // concurrentFeatures: true,
    // serverComponents: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  pageExtensions: ['ts', 'tsx', 'mdx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /react-spring/,
      sideEffects: true,
    });

    return config;
  },
};

module.exports = withVanillaExtract(withTM(withMDX(nextConfig)));
