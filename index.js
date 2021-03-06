const Interface = require('./lib/Interface')
const ParentNode = require('./lib/Node/Parent')
const HeadingNode = require('./lib/Node/Heading')
const TextNode = require('./lib/Node/Text')
const LineBreakNode = require('./lib/Node/LineBreak')
const TableNode = require('./lib/Node/Table')

module.exports = function solspecdown(solcOutput, disableLinkback = false) {

  const metadata = JSON.parse(solcOutput.metadata)
  const interfaces = JSON.parse(solcOutput.interface).map((interfaceData) => {
    return new Interface(interfaceData, metadata)
  }).sort((a, b) => {
    if (a.type === 'constructor') {
      return -1
    }
    return a.methodName.localeCompare(b.methodName)
  })

  const children = []

  if (metadata.output.devdoc.title) {
    children.push(new HeadingNode(1, metadata.output.devdoc.title))
  }

  if (metadata.output.devdoc.author) {
    children.push(new TextNode(`Author: ${metadata.output.devdoc.author}`))
  }

  const links = [
    `[abi](data:,${encodeURI(JSON.stringify(JSON.parse(solcOutput.interface), null, 2))})`,
    `[bytecode](data:,${solcOutput.bytecode})`,
    `[runtime bytecode](data:,${solcOutput.runtimeBytecode})`
  ]

  children.push(new LineBreakNode())
  children.push(new TextNode(links.join(' | ')))
  children.push(new LineBreakNode())

  if (!disableLinkback) {
    children.push(new LineBreakNode())
    children.push(new TextNode(`Documentation generated by [@GuildCrypt/solspecdown](https://github.com/GuildCrypt/solspecdown)`))
  }

  children.push(
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
  )

  const parentNode = new ParentNode(children)

  return parentNode.getMarkdown()
}
