import fs from "fs";
import path from "path";
import { globSync } from "glob";

const baseDir = "src";
const files = globSync(path.join(baseDir, "**/*.md"));

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) continue;

  const front = match[1];
  const lines = front.split(/\r?\n/);
  const start = lines.findIndex((l) => l.startsWith("interventions:"));
  if (start === -1) continue;

  let end = start + 1;
  while (
    end < lines.length &&
    (lines[end].startsWith(" ") || lines[end].trim() === "")
  ) {
    end++;
  }

  const blockLines = lines.slice(start + 1, end);
  const items = [];
  let current = [];
  for (const line of blockLines) {
    if (line.startsWith("  - ")) {
      if (current.length) items.push(current);
      current = [line];
    } else {
      current.push(line);
    }
  }
  if (current.length) items.push(current);

  if (!items.length) continue;

  const extractYear = (item) => {
    const yearLine = item.find((l) => l.trimStart().startsWith("year:")) || "";
    const nums = yearLine.match(/\d{4}/g);
    if (!nums) return 0;
    return Math.max(...nums.map(Number));
  };

  const sorted = [...items].sort((a, b) => extractYear(b) - extractYear(a));

  let changed = false;
  for (let i = 0; i < items.length; i++) {
    if (items[i].join("\n") !== sorted[i].join("\n")) {
      changed = true;
      break;
    }
  }
  if (!changed) continue;

  const newBlock = sorted.flat();
  lines.splice(start + 1, blockLines.length, ...newBlock);

  const newYaml = lines.join("\n");
  const newContent = "---\n" + newYaml + "\n---" + text.slice(match[0].length);
  fs.writeFileSync(file, newContent);
  console.log("Sorted interventions in", file);
}
