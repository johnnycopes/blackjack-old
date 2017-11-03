module.exports = {
  entry: "./js/app.js",
  devtool: 'inline-source-map',
  output: {
    filename: "./js/main.js"
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
      }
    ]
  }
};
