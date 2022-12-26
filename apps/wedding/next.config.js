const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  images: {
    domains: ['nxebvjdlaxautnvwsjzo.supabase.co'],
  },
};

module.exports = nextConfig;
