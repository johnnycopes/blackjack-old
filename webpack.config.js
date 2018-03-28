const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

let config = {
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.ts$/, // files ending with .ts
				exclude: /node_modules/, // exclude the node modules directory
				use: 'ts-loader'
			},
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
				test: /\.scss$/, // files ending with .scss
				use: ['css-hot-loader'].concat(
					ExtractTextWebpackPlugin.extract({
						fallback: 'style-loader',
						use: ['css-loader', 'postcss-loader', 'sass-loader']
					})
				)
			},
			{
				test: /\.(png|svg|jpg|gif)$/, // for other file types
				use: ['file-loader?name=[name].[ext]&outputPath=img/']
			}
		] // end rules
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new ExtractTextWebpackPlugin('styles.css') // call the ExtractTextWebpackPlugin and name our CSS file
	],
	devServer: {
		contentBase: path.resolve(__dirname, './dist'), // A directory or URL to serve HTML content from
		historyApiFallback: true, // fallback to /index.html for SPA
		inline: true,
		open: true // open default browser on launch
	},
	devtool: 'eval-source-map' // for choosing a style of source map
};

module.exports = config;

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
		new OptimizeCSSAssets() // call the CSS optimizer (for minification)
	);
}
