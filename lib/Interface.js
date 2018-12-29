const TableNode = require('./Node/Table')
const InterfaceNode = require('./Node/Interface')

module.exports = class Interface {
  constructor(data, metadata) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key]
    })
    const name = this.type === 'constructor' ? 'constructor' : this.name
    this.methodName = `${name}(${this.inputs.map((input) => { return input.type})})`
    this.method = this.type === 'constructor' ?
      metadata.output.devdoc.methods.constructor :
      metadata.output.devdoc.methods[this.methodName]
  }

  getNode() {
    return new InterfaceNode(this)
  }

  getInputsTableNode() {
    const headers = ['', 'Type', 'Name', 'Description']
    if(this.type === 'event') {
      headers.push('Indexed?')
    }

    const rows = this.inputs.map((input, index) => {
      const row = [
        `\`${index}\``,
        `\`${input.type}\``,
        input.name ? `\`${input.name}\`` : '',
        this.method && this.method.params ? this.method.params[input.name] : ''
      ]
      if(this.type === 'event') {
        row.push(`\`${input.indexed}\``)
      }
      return row
    })
    return new TableNode(headers, rows)
  }

  getOutputsTableNode() {
    return new TableNode(['', 'Type', 'Name', 'Description'], this.outputs.map((output, index) => {
      return [
        `\`${index}\``,
        `\`${output.type}\``,
        output.name ? `\`${output.name}\`` : '',
        this.method && this.method.params ? this.method.params[output.name] : ''
      ]
    }))
  }
}
