import { glob } from "glob";
import matter from "gray-matter";
import { readFileSync } from "node:fs";
import path from "node:path";
import { Post } from "../../interfaces/Post";
import { specificConfig } from "../../siteconfig";

export const createContentLoader = (pattern: string) => {
  const srcDir = path.resolve(specificConfig.srcDir);
  return {
    async load(): Promise<Post[]> {
      // look at all files in pattern
      const files = await glob(pattern, {
        cwd: srcDir,
        posix: true,
      });
      // extract them the frontmatter and the url
      const posts: Post[] = [];
      for (const file of files) {
        const src = readFileSync(path.join(srcDir, file), "utf-8");
        const matterContent = matter(src, { excerpt: false });

        posts.push({
          url: file.replace(/.md$/, ""),
          frontmatter: matterContent.data as Post["frontmatter"],
        });
      }
      return posts;
    },
  };
};
