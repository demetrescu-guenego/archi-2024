import { glob } from "glob";
import matter from "gray-matter";
import { readFileSync } from "node:fs";
import path from "node:path";
import { SiteConfig } from "vitepress";
import { Post } from "../interfaces/Post";

export const createContentLoader = (pattern: string, options: unknown) => {
  const config: SiteConfig = globalThis.VITEPRESS_CONFIG;
  return {
    async load(): Promise<Post[]> {
      // look at all files in pattern
      const files = await glob(pattern, {
        cwd: config.srcDir,
        posix: true,
      });
      // extract them the frontmatter and the url
      const posts: { url: string; frontmatter: any }[] = [];
      for (const file of files) {
        const src = readFileSync(path.join(config.srcDir, file), "utf-8");
        const matterContent = matter(src, { excerpt: false });

        posts.push({
          url: file.replace(/.md$/, ""),
          frontmatter: matterContent.data,
        });
      }
      return posts;
    },
  };
};