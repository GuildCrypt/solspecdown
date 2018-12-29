const output = require('./output')
const fs = require('fs')
const solspecdown = require('../')

fs.writeFileSync(`${__dirname}/test.output.md`, solspecdown(output.contracts['GC0.sol:GC0']))
