import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { createRequire } from 'node:module';
import remarkGfm from 'remark-gfm';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import rehypeMetaAsAttribute from './rehype-meta-as-attribute.mjs';

const withVanillaExtract = createVanillaExtractPlugin();

const mdxLayoutLoader = fileURLToPath(new URL('loader.js', import.meta.url));

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
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: createRequire(import.meta.url).resolve('@mdx-js/loader'),
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            jsxRuntime: 'classic',
            providerImportSource: '@mdx-js/react',
            rehypePlugins: [rehypeMetaAsAttribute],
            remarkPlugins: [remarkGfm],
            pragmaFrag: '___Fragment',
          },
        },
        mdxLayoutLoader,
      ],
    });

    // FIXME: https://github.com/vercel/next.js/issues/33693
    config.infrastructureLogging = {
      level: 'error',
    };

    return config;
  },
};

export default withVanillaExtract(nextConfig);
