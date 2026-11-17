import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const common = { title: z.string(), description: z.string() };
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    ...common,
    order: z.number(), level: z.string(), label: z.string(), source: z.url(),
    readingTime: z.string(), insight: z.string(),
    metrics: z.array(z.object({ value: z.string(), label: z.string(), context: z.string() })).length(3),
    takeaways: z.array(z.object({ title: z.string(), text: z.string() })).min(2).max(3),
  }),
});
const insightId = z.enum(['bottleneck', 'experience-speed', 'constraints', 'verification', 'environment', 'memory']);
const levels = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/levels' }),
  schema: z.object({
    ...common,
    code: z.string(), order: z.number(), question: z.string(), scope: z.string(), evidence: z.string(),
    definition: z.string(), judgment: z.string(), sourceSection: z.string(),
    focus: z.array(z.object({ label: z.string(), text: z.string() })).length(3),
    fromPrevious: z.object({ title: z.string(), before: z.string(), after: z.string(), difference: z.string() }).optional(),
    cases: z.array(z.object({
      id: z.enum(['naive', 'recursive-first-steps', 'flint', 'apex']),
      label: z.string(), relation: z.string(), observation: z.string(), meaning: z.string(),
    })).min(1).max(4),
    examples: z.array(z.object({
      label: z.string(), url: z.url(), relation: z.string(), observation: z.string(), meaning: z.string(),
    })).max(2).optional(),
    insightLinks: z.array(z.object({ id: insightId, label: z.string() })).min(1).max(2),
    distinctions: z.array(z.object({ title: z.string(), text: z.string() })).length(2).optional(),
  }),
});
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    ...common,
    insights: z.array(z.object({
      id: insightId, number: z.string(), label: z.string(), title: z.string(), thesis: z.string(),
      evidence: z.string(),
      sources: z.array(z.object({ label: z.string(), url: z.url() })).min(1).max(2),
      reasoning: z.array(z.string()).min(2).max(3), choice: z.string(),
      connections: z.array(z.object({ id: insightId, text: z.string() })).min(1).max(2),
      cases: z.array(z.object({ label: z.string(), id: z.enum(['naive', 'recursive-first-steps', 'flint', 'apex']) })).min(1).max(2),
    })).length(6).optional(),
  }),
});
export const collections = { posts, levels, pages };
