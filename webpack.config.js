const path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  output: {
    path: path.resolve(__dirname, "public")
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 3010
  },
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: "images/*.jpg" },
        { from: "*.html" }
      ]
    })
   ]
}

