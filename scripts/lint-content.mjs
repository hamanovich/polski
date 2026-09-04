import { readdir, readFile } from "node:fs/promises";
import { resolve, dirname, join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const skipDirs = new Set(["node_modules", "og"]);
const extensions = new Set([".js", ".mjs", ".html", ".css", ".md", ".txt"]);
const rules = [
  {char:"\u2014", label:"U+2014 em dash", fix:"дефис с пробелами, запятая, двоеточие или скобки"},
  {char:"\u00a0", label:"U+00A0 non-breaking space", fix:"обычный пробел"}
];
const MAX_REPORTED = 40;

async function* walk(dir){
  for(const entry of await readdir(dir, {withFileTypes:true})){
    const full = join(dir, entry.name);
    if(entry.isDirectory()){
      if(skipDirs.has(entry.name) || entry.name.startsWith(".")) continue;
      yield* walk(full);
    }else if(extensions.has(extname(entry.name))){
      yield full;
    }
  }
}

const problems = [];
let scanned = 0;

for await (const file of walk(root)){
  scanned += 1;
  const source = await readFile(file, "utf8");
  for(const rule of rules){
    if(!source.includes(rule.char)) continue;
    source.split("\n").forEach((line, index) => {
      for(let column = line.indexOf(rule.char); column !== -1; column = line.indexOf(rule.char, column + 1)){
        problems.push({
          where:`${relative(root, file)}:${index + 1}:${column + 1}`,
          rule,
          excerpt:line.slice(Math.max(0, column - 45), column + 45).trim()
        });
      }
    });
  }
}

if(problems.length){
  for(const problem of problems.slice(0, MAX_REPORTED)){
    console.error(`${problem.where}  ${problem.rule.label}`);
    console.error(`  ${problem.excerpt}`);
    console.error(`  замена: ${problem.rule.fix}`);
  }
  if(problems.length > MAX_REPORTED) console.error(`... and ${problems.length - MAX_REPORTED} more`);
  console.error(`\nContent lint failed: ${problems.length} banned characters in ${new Set(problems.map(problem => problem.where.split(":")[0])).size} files`);
  process.exit(1);
}

console.log(`Content lint passed: ${scanned} files, ${rules.length} rules`);
