import { build } from "esbuild"
import fs from "node:fs"

build({
  entryPoints: ["./src/index.ts"],
  bundle: true,
  outfile: "dist/clearurls.user.js",
  minify: true,
  charset: "utf8",
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  metafile: true,
})
  .then(() => {
    const jsPath = "./dist/clearurls.user.js"
    const s = fs.readFileSync(jsPath, 'utf8');

    const metaPath = "./meta.js"
    const meta = fs.readFileSync(metaPath, 'utf8');
    fs.writeFileSync(jsPath, [meta, s].join("\n\n"))
  })