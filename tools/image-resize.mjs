import sharp from "sharp";
import { glob } from "glob";
import { basename, dirname, join, normalize } from "node:path";
import { rename, unlink } from "node:fs/promises";

sharp.cache({ files: 0 });

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

const projectDir = process.cwd();
const cwd = normalize(projectDir + "/src/public/photos/projects");
console.log("cwd: ", cwd);

const thumbnails = await glob("./**/thumbnail-*.jpg", {
  cwd: cwd,
  posix: true,
});

for (const thumbnail of thumbnails) {
  const file = join(cwd, thumbnail);
  console.log("file: ", file);
  const dir = dirname(file);
  const newfile = join(dir, "new-" + basename(file));
  console.log("newfile: ", newfile);

  await sharp(file).resize(288, 176).toFile(newfile);
  await sleep(0);
  await unlink(file);
  await rename(newfile, file);
}
