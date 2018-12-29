module.exports = class HeadingNode {
  constructor(level, text, slug) {
    this.level = level
    this.text = text
    this.slug = slug
  }
  getMarkdown() {
    const anchor = this.slug ? `<a name="${this.slug}"></a> ` : ''
    return `${'#'.repeat(this.level)} ${anchor}${this.text}`
  }
}
