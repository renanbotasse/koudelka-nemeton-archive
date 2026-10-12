import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import mdx from '@astrojs/mdx';

export default defineConfig({
  output: 'static',
  // Old addresses keep working after the renames (Walkthrough, Design).
  redirects: {
    '/world': '/walkthrough',
    '/world/[slug]': '/walkthrough/[slug]',
    '/sound': '/design',
    '/archive/making': '/design',
  },
  integrations: [solid(), mdx()],
});
