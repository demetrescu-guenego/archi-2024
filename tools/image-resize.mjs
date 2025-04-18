import { glob } from "glob";
import { basename, dirname, join, normalize } from "node:path";
import sharp from "sharp";
import { stat } from "node:fs/promises";

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
  const avifFile = join(dir, basename(file, "jpg") + "avif");
  console.log("avifFile: ", avifFile);
  const webpFile = join(dir, basename(file, "jpg") + "webp");
  console.log("webpFile: ", webpFile);

  await sharp(file)
    .resize(width * scale, height * scale, {
      fit: "cover",
      kernel: "lanczos3",
    })
    .toFormat("avif", { quality: 80, chromaSubsampling: "4:2:0" })
    .toFile(avifFile);

  const { size: avifSize } = await stat(avifFile);
  console.log("avif size: ", avifSize);

  await sharp(file)
    .resize(width * scale, height * scale, {
      fit: "cover",
      kernel: "lanczos3",
    })
    .toFormat("webp", { quality: 100 })
    .toFile(webpFile);

  const { size: webpSize } = await stat(webpFile);
  console.log("webp size: ", webpSize);

  // await sleep(0);
  // await unlink(file);
  // await rename(newfile, file);
}
