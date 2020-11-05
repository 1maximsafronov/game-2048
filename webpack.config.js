const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `script.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-maps`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};