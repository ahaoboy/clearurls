import fs from 'node:fs'

const url = "https://github.com/ClearURLs/Rules/raw/refs/heads/master/data.min.json"

fetch(url).then(r => r.text()).then(v => {
  const code = `export default (${v.trim()})`;
  fs.writeFileSync("./lib/index.js", code)
})