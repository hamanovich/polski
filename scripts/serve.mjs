import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, dirname, extname, join, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const port = Number(process.argv[2] || process.env.PORT || 8765);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2"
};

const inside = path => path === root || path.startsWith(root + sep);

async function resolveFile(pathname){
  const target = resolve(root, "." + decodeURIComponent(pathname));
  if(!inside(target)) return null;
  const found = await stat(target).catch(() => null);
  if(found?.isFile()) return target;
  if(found?.isDirectory()){
    const index = join(target, "index.html");
    return await stat(index).then(entry => entry.isFile() ? index : null, () => null);
  }
  return null;
}

createServer(async (request, response) => {
  const { pathname } = new URL(request.url, "http://localhost");
  const file = await resolveFile(pathname);
  if(!file){
    const notFound = await resolveFile("/404.html");
    response.writeHead(404, {"content-type": types[".html"]});
    if(notFound) return createReadStream(notFound).pipe(response);
    return response.end("404");
  }
  response.writeHead(200, {
    "content-type": types[extname(file).toLowerCase()] || "application/octet-stream",
    "cache-control": "no-store"
  });
  createReadStream(file).pipe(response);
}).listen(port, () => console.log(`http://localhost:${port}/`));
