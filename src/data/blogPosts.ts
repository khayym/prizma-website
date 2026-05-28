export interface BlogPostMeta {
  key: string;
  /** Tailwind gradient classes used for the thumbnail/banner. */
  tone: string;
}

export const blogPosts: BlogPostMeta[] = [
  { key: "post1", tone: "from-brand-600 to-brand-900" },
  { key: "post2", tone: "from-ink-700 to-ink-900" },
  { key: "post3", tone: "from-brand-700 to-ink-900" },
  { key: "post4", tone: "from-accent-600 to-brand-900" },
  { key: "post5", tone: "from-brand-800 to-ink-950" },
  { key: "post6", tone: "from-ink-600 to-brand-900" },
];

export const toneByKey: Record<string, string> = blogPosts.reduce(
  (acc, p) => {
    acc[p.key] = p.tone;
    return acc;
  },
  {} as Record<string, string>
);
