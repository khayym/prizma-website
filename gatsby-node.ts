import path from "path";
import type { GatsbyNode } from "gatsby";
import { blogPosts } from "./src/data/blogPosts";

export const createPages: GatsbyNode["createPages"] = ({ actions }) => {
  const { createPage } = actions;
  const template = path.resolve(__dirname, "src/templates/blog-post.tsx");

  blogPosts.forEach((post) => {
    createPage({
      path: `/blog/${post.key}`,
      component: template,
      context: {
        postKey: post.key,
      },
    });
  });
};
