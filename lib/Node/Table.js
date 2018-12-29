module.exports = class TableNode {
  constructor(headings, rows) {
    this.headings = headings
    this.rows = rows
  }
  getMarkdown() {
    const headingMarkdown = `| ${this.headings.join(' | ')} |`
    const dividerMarkdown = `|${'---|'.repeat(this.headings.length)}`
    const rowsMarkdown = this.rows.map((cells) => {
      return `| ${cells.join(' | ')} |`
    }).join('\n')
    return `${headingMarkdown}\n${dividerMarkdown}\n${rowsMarkdown}`
  }
}
