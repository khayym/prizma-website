export interface BlogPostMeta {
  key: string;
  /** Tailwind gradient classes used for the thumbnail/banner. */
  tone: string;
}

export const blogPosts: BlogPostMeta[] = [
  { key: "process", tone: "from-brand-600 to-brand-950" },
  { key: "erp", tone: "from-brand-700 to-brand-950" },
  { key: "accounting", tone: "from-brand-600 to-brand-950" },
  { key: "reports", tone: "from-brand-400 to-brand-950" },
  { key: "hrm", tone: "from-brand-800 to-brand-950" },
];

export const toneByKey: Record<string, string> = blogPosts.reduce(
  (acc, p) => {
    acc[p.key] = p.tone;
    return acc;
  },
  {} as Record<string, string>
);
