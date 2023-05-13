const path = require('path')

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
  }
}
