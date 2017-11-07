const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: "./src/js/app.js",
  devtool: 'inline-source-map',
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
                use: [{
                    loader: "css-loader", options: {
                      sourceMap: true
                    }
                }, {
                    loader: "sass-loader", options: {
                      sourceMap: true
                    }
                }],
                // use style-loader in development
                fallback: "style-loader"
            })
      }
    ]
  }
};
