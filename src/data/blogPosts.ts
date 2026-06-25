export interface BlogPostMeta {
  key: string;
  /** Tailwind gradient classes used for the thumbnail/banner. */
  tone: string;
}

export const blogPosts: BlogPostMeta[] = [
  { key: "process", tone: "from-brand-600 to-brand-900" },
  { key: "erp", tone: "from-ink-700 to-ink-900" },
  { key: "accounting", tone: "from-brand-700 to-ink-900" },
  { key: "reports", tone: "from-accent-600 to-brand-900" },
  { key: "hrm", tone: "from-brand-800 to-ink-950" },
];

export const toneByKey: Record<string, string> = blogPosts.reduce(
  (acc, p) => {
    acc[p.key] = p.tone;
    return acc;
  },
  {} as Record<string, string>
);
