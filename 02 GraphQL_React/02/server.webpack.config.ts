import path from "path";
import webpack from "webpack";

const serverConfig: webpack.Configuration = {
  mode: "production",
  devtool: "source-map",
  // devtool: false,
  entry: { main: "./server/server.ts" },
  output: { path: path.join(__dirname, "/distServer"), filename: "bundleApi.js", clean: true, publicPath: "", iife: true },
  target: "node",
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
  module: {
    rules: [
      //* V1: ts-loader
      { test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ },
    ],
  },
};

export default serverConfig;
