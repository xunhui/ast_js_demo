const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");

const utils = require('../utils/index')

/**
 * 将函数中的 console.log 改写为 console.error 并在打印内容前加上函数名
 * @param {*} code 初始代码
 */
const compile = (code) => {
  // 1. tokenizer + parser
  const ast = parser.parse(code)
  // utils.writeAst2File(ast) // 查看 ast 结果

  // 2. traverse
  const visitor = {
    CallExpression(path) {
      const { callee } = path.node
      if (types.isCallExpression(path.node) && types.isMemberExpression(callee)) {
        const { object, property } = callee
        if (object.name === 'console' && property.name === 'log') {
          property.name = 'error'
        } else {
          return
        }
        const FunctionDeclarationNode = path.findParent(parent => {
          return parent.type === 'FunctionDeclaration'
        })
        const funcNameNode = types.stringLiteral(FunctionDeclarationNode.node.id.name)
        path.node.arguments.unshift(funcNameNode)
      }
    }
  }
  traverse.default(ast, visitor)
  // 3. code generator
  const newCode = generator.default(ast, {}, code).code
  console.log(newCode)
}

module.exports = compile