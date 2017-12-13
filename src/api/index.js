const fs = require('fs-plus')

const path = require('path')

const attachRouter = ({ router }) => dir => {
  const endpoint = path.resolve(dir)

  if (!fs.isDirectorySync(endpoint))
    return

  require(endpoint)({ router })
}

module.exports = function ({ router }) {
  fs.listSync(__dirname)
    .forEach(attachRouter({ router }))
}
