const Interface = require('./lib/Interface')
const ParentNode = require('./lib/Node/Parent')
const HeadingNode = require('./lib/Node/Heading')
const TextNode = require('./lib/Node/Text')
const LineBreakNode = require('./lib/Node/LineBreak')
const TableNode = require('./lib/Node/Table')

module.exports = function solspecdown(solcOutput) {

  const metadata = JSON.parse(solcOutput.metadata)
  const interfaces = JSON.parse(solcOutput.interface).map((interfaceData) => {
    return new Interface(interfaceData, metadata)
  }).sort((a, b) => {
    if (a.type === 'constructor') {
      return -1
    }
    return a.methodName.localeCompare(b.methodName)
  })

  const parentNode = new ParentNode([
    new HeadingNode(1, metadata.output.devdoc.title),
    new TextNode(`Author: ${metadata.output.devdoc.author}`),
    new LineBreakNode(),
    new TableNode(['Name', 'Type'], interfaces.map((interface) => {
      const type = interface.type === 'function' ?
        `function (${interface.constant === true ? 'constant' : 'non-constant'})`
        : interface.type
      return [
        `[\`${interface.methodName}\`](#${interface.methodName})`,
        type
      ]
    })),
    ...interfaces.map((interface) => {
      return interface.getNode()
    })
  ])

  return parentNode.getMarkdown()
}