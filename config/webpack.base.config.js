const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const APP_DIR = path.resolve(__dirname, '../src')

module.exports = env => {
	const { PLATFORM, VERSION } = env
	return merge([
		{
			entry: ['@babel/polyfill', APP_DIR],
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader'
						}
					},
					{
						test: /\.(scss|css)$/,
						use: [
							PLATFORM === 'production'
								? MiniCssExtractPlugin.loader
								: 'style-loader',
							'css-loader',
							'sass-loader'
						]
					}
				]
			},
			plugins: [
				new CleanWebpackPlugin(['dist']),
				new HtmlWebpackPlugin({
					template: './src/index.html',
					filename: './index.html'
				}),
				new webpack.DefinePlugin({
					'process.env.VERSION': JSON.stringify(env.VERSION),
					'process.env.PLATFORM': JSON.stringify(env.PLATFORM)
				}),
				new CopyWebpackPlugin([{ from: 'src/static' }]),
				new webpack.HashedModuleIdsPlugin()
			],
			output: {
				filename: '[name].bundle.[contenthash].js',
				chunkFilename: '[name].chunk.bundle.[contenthash].js',
				path: path.resolve(__dirname, '..', 'dist'),
				publicPath: '/'
			}
		}
	])
}
