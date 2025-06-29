const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = function override(config, env) {
	config.resolve.fallback = {
		...config.resolve.fallback,
		stream: require.resolve('stream-browserify'),
		buffer: require.resolve('buffer'),
		crypto: require.resolve('crypto-browserify'),
		util: require.resolve("util"),
		fs: false
	}

	// Ensure TypeScript extensions are properly resolved
	config.resolve.extensions = ['.tsx', '.ts', '.jsx', '.js', '.json']

	config.plugins = [
		...config.plugins,
		new webpack.ProvidePlugin({
			process: 'process/browser',
			Buffer: ['buffer', 'Buffer'],
		})
	]

	config.module.rules = [
		...config.module.rules,
		...[
			{
				test: /\.m?js/,
				type: "javascript/auto",
			},
			{
				test: /\.m?js/,
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
		]
	]

	// Add bundle analyzer when ANALYZE environment variable is set
	if (process.env.ANALYZE === 'true') {
		config.plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: 'server',
				analyzerHost: 'localhost',
				analyzerPort: 8888,
				openAnalyzer: true,
				generateStatsFile: false,
				statsFilename: 'stats.json',
				logLevel: 'info'
			})
		)
	}

	return config
}