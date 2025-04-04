import { glob } from "glob";
import { basename, dirname, join, normalize } from "node:path";
import sharp from "sharp";

sharp.cache({ files: 0 });

const projectDir = process.cwd();
const cwd = normalize(projectDir + "/src/public/photos/projects");
console.log("cwd: ", cwd);

const thumbnails = await glob("./**/thumbnail-*.jpg", {
  cwd: cwd,
  posix: true,
});

const width = 288;
const height = 176;
const scale = 2.5;

for (const thumbnail of thumbnails) {
  const file = join(cwd, thumbnail);
  console.log("file: ", file);
  const dir = dirname(file);
  const newfile = join(dir, basename(file, "jpg") + "webp");
  console.log("newfile: ", newfile);

  await sharp(file)
    .toFormat("webp")
    .webp({ quality: 100 })
    .resize(width * scale, height * scale, {
      fit: "cover",
      kernel: "lanczos3",
    })
    .toFile(newfile);

  // await sleep(0);
  // await unlink(file);
  // await rename(newfile, file);
}
