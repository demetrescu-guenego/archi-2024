import fs from "fs";
import path from "path";
import sharp from "sharp";

const baseDir = path.join(process.cwd(), "src", "public", "photos", "projects");
console.log("baseDir: ", baseDir);

async function checkThumbnails(dirPath) {
  // Read all files and directories within the current directory
  const files = fs.readdirSync(dirPath);

  // Loop through each item in the directory
  for (const file of files) {
    const filePath = path.join(dirPath, file);

    // Check if it's a directory
    if (fs.statSync(filePath).isDirectory()) {
      // Recursively check in subdirectories
      await checkThumbnails(filePath);
    }
  }

  // Check if the dirPath contains a thumbnail-*.jpg file
  const thumbnailFiles = files.filter(
    (file) => file.startsWith("thumbnail-") && file.endsWith(".jpg"),
  );

  // If the jpg file exists, print it
  if (thumbnailFiles.length === 0) {
    const webpFiles = files.filter((file) => file.endsWith(".webp"));

    // If the webp file exists, print it
    if (webpFiles.length > 0) {
      for (const webpFile of webpFiles) {
        console.log("Webp file: ", webpFile);

        // Convert webp to jpg with sharp
        const jpgFile = path.join(dirPath, webpFile.replace(/\.webp$/, ".jpg"));
        const webpFilePath = path.join(dirPath, webpFile);

        // Sharp convert webp to jpg with promises and async/await
        await sharp(webpFilePath)
          .toFormat("jpeg", { quality: 100 })
          .toFile(jpgFile);
      }
    }
  }
}

// Start checking from the base directory
checkThumbnails(baseDir);
