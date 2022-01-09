const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const renderer = `
import { createElement } from 'react'
import { mdx as _mdx } from '@mdx-js/react'
import Deck from '../layouts/deck';
import Blog from '../layouts/blog';

const mdx = (name, props, ...children) => {
  if (typeof name === 'string') {
    if (name === 'wrapper') {
      if (props.frontmatter && props.frontmatter.layout === 'deck') {
        return createElement(Deck, props, ...children);
      } else {
        return createElement(Blog, props, ...children);
      }
    }
  }

  return _mdx(name, props, ...children)
}
`;

const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
  options: {
    renderer,
  },
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
};

module.exports = withVanillaExtract(withMDX(nextConfig));
