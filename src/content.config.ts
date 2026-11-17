import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const common = { title: z.string(), description: z.string() };
const posts = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/posts' }), schema: z.object({ ...common, order: z.number(), level: z.string(), label: z.string(), source: z.string().url(), readingTime: z.string(), insight: z.string() }) });
const levels = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/levels' }), schema: z.object({ ...common, code: z.string(), order: z.number(), question: z.string(), scope: z.string(), evidence: z.string() }) });
const pages = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/pages' }), schema: z.object(common) });
export const collections = { posts, levels, pages };
