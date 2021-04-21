const code = require('./code')
const babel = require("@babel/core")
const visitor = require('./import_visitor')

const result = babel.transform(code, {
  plugins: [
    [
      visitor,
      {
        libaryName: '233_UI',
        moduleName: moduleName => `233_UI/lib/src/${moduleName}/${moduleName}`
      }
    ]
  ]
})

console.log(result.code)