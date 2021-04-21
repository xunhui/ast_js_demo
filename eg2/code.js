const code = `
const mySlardar = (e) => {
  console.log('my slardar', e)
}
function add(a, b) {
  console.log('23333')
  throw new Error('233 Error')
  return a + b;
}
add(1, 2)
`

module.exports = code