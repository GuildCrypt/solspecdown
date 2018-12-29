module.exports = class TextNode {
  constructor(text) {
    this.text = text
  }
  getMarkdown() {
    return this.text
  }
}
