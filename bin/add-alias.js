const fs = require('fs').promises;
const { basename, extname } = require('path');

const metadataRegexp = /^\{[\s\S]+\}/.compile()

(async () => {
  const contents = await fs.readdir("./content/");

  Promise.all(
    contents.map(async fileName => {
      const txt = await fs.readFile(`./content/${fileName}`, {encoding: 'utf8'} )
      const metadataSection = txt.match(metadataRegexp)

      if(metadataSection.length <= 0) {
        console.log(`メタデータがないニャン ${fileName}`)
        return Promise.resolve()
      }

      const alias = [`/entries/${basename(fileName, extname(fileName))}`]
      const metadata = {...JSON.parse(metadataSection[0]), alias}

      const replacedTxt = txt.replace(metadataRegexp, JSON.stringify(metadata))
      return await fs.writeFile(`./content/${fileName}`, replacedTxt)
    })
  )
})()

