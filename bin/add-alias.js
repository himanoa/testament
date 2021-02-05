const fs = require('fs').promises;
const { basename, extname } = require('path');

const metadataRegexp = /^\{[^}]+\}\n/;

(async () => {
  const contents = await fs.readdir("./content/");

  Promise.all(
    contents.map(async fileName => {
      const txt = await fs.readFile(`./content/${fileName}`, {encoding: 'utf8'} )
      const metadataSection = txt.match(metadataRegexp)

      if(metadataSection === null) {
        console.log(`メタデータがないニャン ${fileName}`)
        return Promise.resolve()
      }

      console.dir(metadataSection[0])
      const m = JSON.parse(metadataSection[0])
      const alias = [`/entries/${basename(fileName, extname(fileName))}`]
      const metadata = { ...m, alias }

      const replacedTxt = txt.replace(metadataRegexp, JSON.stringify(metadata))
      return await fs.writeFile(`./content/${fileName}`, replacedTxt)
    })
  )
})()

