const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'src/client/public');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
	// Use development as default mode for running local development server
	mode: 'development',
	entry: APP_DIR + '/index.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /.jsx?/,
				include: APP_DIR,
				loader: 'babel-loader'
			},
			{
				test: /.scss$/,
				include: APP_DIR,
				loaders: 'style-loader!css-loader!resolve-url-loader!sass-loader!'
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader'
			}
		]
	},
	optimization: {
		minimize: process.env.NODE_ENV === 'production'
	}
}

module.exports = config;