const generator = require("@babel/generator");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const types = require("@babel/types");

const utils = require('../utils/index')
/**
 * 为所有的函数声音添加 try-catch 块，同时在 catch 中做一些自定义的操作
 * @param {*} code 初始代码
 */
const compile = (code) => {
  // 1. tokenizer + parser
  const ast = parser.parse(code)

  // 2. traverse
  const visitor = {
    FunctionDeclaration(path) {
      const node = path.node
      const { params, id } = node // 函数的参数和函数名节点
      const blockStatementNode = node.body // 函数块内部所有的节点

      // 已经有 try-catch 块的停止遍历，防止 circle loop
      if (blockStatementNode.body && types.isTryStatement(blockStatementNode.body[0])) {
        return
      }

      // 构造 cath 块节点
      const catchBlockStatement = types.blockStatement(
        [types.expressionStatement(
          types.callExpression(types.identifier('mySlardar'), [types.identifier('myError')])
        )]
      )
      const catchClause = types.catchClause(types.identifier('myError'), catchBlockStatement)
      const tryStatementNode = types.tryStatement(blockStatementNode, catchClause)
      const tryCatchFunctionDeclare = types.functionDeclaration(id, params, types.blockStatement([tryStatementNode]))

      path.replaceWith(tryCatchFunctionDeclare)
    }
  }
  traverse.default(ast, visitor)
  // 3. code generator
  const newCode = generator.default(ast, {}, code).code
  // console.log(newCode)
  console.log(eval(newCode))
}

module.exports = compile