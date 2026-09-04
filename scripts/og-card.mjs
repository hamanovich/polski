import { createHash } from "node:crypto";
import { pages, extraPages } from "./pages.mjs";

const escape = value => value.replace(/[&<>]/g, ch => ({"&":"&amp;", "<":"&lt;", ">":"&gt;"}[ch]));
const titleSize = heading =>
  heading.length <= 18 ? 104 : heading.length <= 26 ? 92 : heading.length <= 34 ? 78 : 66;

export const card = heading => `<!DOCTYPE html>
<html lang="ru"><head><meta charset="utf-8"><style>
  html,body{margin:0;padding:0}
  body{
    width:1200px;height:630px;background:#f8f8f5;color:#1c2420;
    font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    display:flex;flex-direction:column;justify-content:space-between;
    padding:74px 90px;box-sizing:border-box;
  }
  .brand{font-family:"Iowan Old Style",Charter,"Noto Serif",Georgia,serif;font-size:34px;letter-spacing:-.01em}
  .brand i{font-style:normal;color:#a53832}
  h1{
    font-size:${titleSize(heading)}px;font-weight:730;line-height:1.03;letter-spacing:-.055em;
    margin:0;max-width:17ch;
  }
  .foot{display:flex;align-items:center;gap:18px;font-size:25px;color:#647069}
  .rule{flex:0 0 74px;height:4px;background:#a53832;border-radius:2px}
</style></head><body>
  <div class="brand">Polski: końców<i>ki</i></div>
  <h1>${escape(heading)}</h1>
  <div class="foot"><span class="rule"></span>справочник польской грамматики на русском</div>
</body></html>`;

export const socialCards = [
  ...pages.map(page => ({name:page.path || "index", heading:page.h1})),
  ...extraPages.map(extra => ({name:extra.path, heading:extra.h1}))
];

export const cardFingerprint = heading => createHash("sha256").update(card(heading)).digest("hex").slice(0, 10);

export const cardManifest = () =>
  Object.fromEntries(socialCards.map(({name, heading}) => [name, cardFingerprint(heading)]));
