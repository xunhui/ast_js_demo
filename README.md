## 关于如何在项目中使用 JS 抽象语法树(AST) 的几个 DEMO
所有 DEMO 均依赖于以下几款工具：
- @babel/parser: 将 JS 代码解析成对应的 AST
- @babel/traverse: 对 AST 节点进行递归遍历
- @babel/types: 集成了一些快速生成、修改、删除 AST Node的方法
- @babel/generator: 根据修改过后的 AST 生成新的 js 代码

**DEMO1**：将所有函数中的普通 log 打印转换成 error 打印，并在打印内容前方附加函数名的字符串

**DEMO2**：为所有的函数添加错误捕获，并在捕获阶段实现自定义的处理操作

**DEMO3**：在 webpack 中实现 import 的按需导入（乞丐版 babel-import-plugin）