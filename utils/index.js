const fs = require('fs')
const path = require('path')

const writeAst2File = (ast) => {
  return fs.writeFile(path.resolve(__dirname, '..', 'dist', `ast${-new Date().getTime()}.json`), JSON.stringify(ast, null, 2), {}, (err) => {
    if (err) {
      throw err
    }
  })
}

const writeParsedCode2Terminal = (code) => {
  return console.log(code)
}

module.exports = {
  writeAst2File,
  writeParsedCode2Terminal
}