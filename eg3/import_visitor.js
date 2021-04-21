module.exports = function ({types}) {
  return {
    visitor: {
      ImportDeclaration(path, {opts}) {
        const _getModulePath = opts.moduleName // 获取模块指定路径，通过插件的参数传递进来
        const importSpecifierNodes = path.node.specifiers // 导入的对象节点
        const importSourceNode = path.node.source // 导入的来源节点
        const sourceNodePath = importSourceNode.value

        // 已经成功替换的节点不再遍历
        if (!opts.libaryName || sourceNodePath !== opts.libaryName) {
          return
        }
        
        const modulePaths = importSpecifierNodes.map(node => {
          return _getModulePath(node.imported.name)
        })

        const newImportDeclarationNodes = importSpecifierNodes.map((node, index) => {
          return types.importDeclaration([node], types.stringLiteral(modulePaths[index]))
        })

        path.replaceWithMultiple(newImportDeclarationNodes)
      }
    }
  }
}