module.exports = class ParentNode {
  constructor(children) {
    this.children = children
  }
  getMarkdown() {
    return this.children.map((child) => {
      return child.getMarkdown()
    }).join('\n')
  }
}
