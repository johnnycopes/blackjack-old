const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

let config = {
	entry: './src/index.ts',
	devtool: 'eval-source-map', // for choosing a style of source map
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, './dist')
	},
	devServer: {
		contentBase: path.resolve(__dirname, './dist'), // A directory or URL to serve HTML content from
		historyApiFallback: true, // fallback to /index.html for SPA
		inline: true,
		open: false // open default browser on launch
	},
	module: {
		rules: [
			{
				test: /\.ts$/, // files ending with .ts
				exclude: /node_modules/, // exclude the node modules directory
				use: 'ts-loader'
			},
			{
				test: /\.scss$/, // files ending with .scss
				use: ['css-hot-loader'].concat(
					ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							// { loader: 'style-loader', options: { sourceMap: true } },
							{ loader: 'css-loader', options: { sourceMap: true } },
							{ loader: 'postcss-loader', options: { sourceMap: true } },
							{ loader: 'sass-loader', options: { sourceMap: true } },
						],
					})
				)
			},
			{
				test: /\.(png|svg|jpg|gif)$/, // for other file types
				use: ['file-loader?name=[name].[ext]&outputPath=img/']
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		}),
		new ExtractTextPlugin('styles.css') // call the ExtractTextPlugin and name our CSS file
	]
};

module.exports = config;

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
		new OptimizeCSSAssets() // call the CSS optimizer (for minification)
	);
}