import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { card, socialCards, cardManifest } from "./og-card.mjs";

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = resolve(root, "og");

const chromeCandidates = [
  process.env.CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium"
].filter(Boolean);

async function findChrome(){
  for(const candidate of chromeCandidates){
    try{
      await run(candidate, ["--version"]);
      return candidate;
    }catch{}
  }
  throw new Error(`Chrome not found. Set CHROME to its path. Tried:\n${chromeCandidates.join("\n")}`);
}

const chrome = await findChrome();
const workDir = await mkdtemp(join(tmpdir(), "og-"));
await mkdir(outputDir, {recursive:true});

for(const batch of socialCards.reduce((groups, item, index) => {
  const group = Math.floor(index / 4);
  (groups[group] ||= []).push(item);
  return groups;
}, [])){
  await Promise.all(batch.map(async ({name, heading}) => {
    const source = join(workDir, `${name}.html`);
    await writeFile(source, card(heading), "utf8");
    await run(chrome, [
      "--headless", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
      "--window-size=1200,630", `--screenshot=${resolve(outputDir, `${name}.png`)}`,
      `file://${source}`
    ]);
  }));
}

await writeFile(resolve(outputDir, "manifest.json"), `${JSON.stringify(cardManifest(), null, 2)}\n`, "utf8");
await rm(workDir, {recursive:true, force:true});
console.log(`Rendered ${socialCards.length} social cards into og/`);
