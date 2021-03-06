const webpack = require(`webpack`);
const path = require(`path`);

module.exports = {
  entry: `./src/js/script.js`,
  output: {
    path: path.resolve(`./dist`),
    filename: `js/script.js`,
  },
  devtool: `sourcemap`,
  devServer: {
    contentBase: `./src`, historyApiFallback: true, hot: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: `babel`
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
