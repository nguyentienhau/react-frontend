const path = require("path");
const webpack = require("webpack");

module.exports = function (env, argsObject) {
	return {
		entry: "./index.jsx",
		output: {
			path: path.resolve(__dirname, argsObject.mode || "bundle"),
			filename: "index.js"
		},
		target: ["web"],
		devServer: {
			static: {
				directory: "public"
			},
			port: 5000,
			open: true,
			historyApiFallback: true
		},
		resolve: {
			modules: ["build", "node_modules", "style"],
			extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"],
			alias: {
				source: path.resolve(__dirname, "source"),
				style: path.resolve(__dirname, "style")
			}
		},
		stats: {
			errorDetails: true
		},
		module: {
			rules: [
				{
					test: /\.([cm]?ts|tsx)$/,
					exclude: /node_modules/,
					use: ["ts-loader", "babel-loader"]
				},
				{
					test: /\.([cm]?js|jsx)$/,
					exclude: /node_modules/,
					use: ["babel-loader"]
				},
				{
					test: /\.(css|scss|sass)$/,
					use: ["style-loader", "css-loader"]
				},
				{
					test: /\.(png|jpeg|jpg|bmp|svg|gif)$/,
					use: ["file-loader"]
				}
			]
		},
		plugins: [
			new webpack.ProvidePlugin({
				React: "react"
			})
		]
	};
};
