const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: "./src/js/index.js",
  devtool: 'source-map',
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
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader", // translates CSS into CommonJS
          options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader", // compiles Sass to CSS
          options: {
            sourceMap: true
          }
        }]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader?name=[name].[ext]&outputPath=img/'
        ]
      },
      //  for production only
      // {
      //   test: /\.scss$/,
      //   use: extractSass.extract({
      //           use: [{
      //               loader: "css-loader"
      //           }, {
      //               loader: "sass-loader"
      //           }],
      //           // use style-loader in development
      //           fallback: "style-loader"
      //       })
      // }
    ]
  },
  // plugins: [
  //   extractSass
  // ]
};
