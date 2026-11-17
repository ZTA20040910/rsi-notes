import { defineConfig } from 'astro/config';
import { unified, rehypeHeadingIds } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
export default defineConfig({
  site: 'https://zta20040910.github.io', base: '/rsi-notes', trailingSlash: 'always', output: 'static',
  markdown: { processor: unified({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeHeadingIds, rehypeKatex] }) },
});
