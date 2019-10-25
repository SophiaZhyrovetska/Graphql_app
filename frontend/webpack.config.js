const path = require("path");
const app = path.resolve(__dirname, "./");
module.exports = {
	mode: "development",
	devtool: "source-map",
	entry: "./src/index.tsx",
	output: {
		filename: "main.js",
		path: __dirname + "/dist/"
	},
	resolve: {
		alias: {
			app: app + "/src",
			images: app + "/src/assets/images",
			components: app + "/src/components",
		},
		extensions: [".ts", ".tsx", ".js", ".gql"]
	},

	module: {
		rules: [
			{
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: 'graphql-tag/loader',
			},

			{
				test: /\.(ts|tsx)?$/,
				loader: 'ts-loader'
			},

			{
				test: /\.(css|scss)$/,
				loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap']
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader",
				exclude: /node_modules/,
			}
		]
	},
	devServer: {
		hot: true,
		historyApiFallback: true,
	}
};
