const HeadingNode = require('./Heading')
const HrNode = require('./Hr')
const ParentNode = require('./Parent')
const TextNode = require('./Text')

module.exports = class InterfaceNode {
  constructor(_interface) {
    this.interface = _interface
  }
  getMarkdown() {
    const children = [
      new HeadingNode(4, `\`${this.interface.methodName}\``, this.interface.methodName)
    ]

    if (this.interface.method && this.interface.method.details) {
      children.push(new TextNode(this.interface.method.details))
    }

    if (this.interface.inputs && this.interface.inputs.length > 0) {
      children.push(...[
        new HeadingNode(5, 'Inputs'),
        this.interface.getInputsTableNode()
      ])
    }

    if (this.interface.outputs && this.interface.outputs.length > 0) {
      children.push(...[
        new HeadingNode(5, 'Outputs'),
        this.interface.getOutputsTableNode()
      ])
    }

    children.push(new HrNode())

    const parentNode = new ParentNode(children)

    return parentNode.getMarkdown()
  }
}
