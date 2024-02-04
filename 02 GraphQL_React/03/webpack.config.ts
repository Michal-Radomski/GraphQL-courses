import path from "path";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const HtmlWebpackPlugin = require("html-webpack-plugin");

// console.log("process.env.NODE_ENV:", process.env.NODE_ENV);

const config: webpack.Configuration = {
  mode: "development",
  entry: {
    main: ["webpack-hot-middleware/client?reload=true", "./client/src/main.tsx"],
  },
  devtool: "inline-source-map",
  target: "browserslist",
  output: { path: path.join(__dirname, "/dist"), filename: "bundle.js", clean: true, publicPath: "", iife: true },
  optimization: {
    minimize: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|ttf)$/i,
        type: "asset/resource",
      },
      { test: /\.(svg)$/, type: "asset/inline" },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env", "@babel/preset-typescript", "@babel/preset-react"] },
        },
      },
    ],
  },
  resolve: { extensions: [".tsx", ".ts", ".js", "jsx"] },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].chunk_css.css",
    }),
    new HtmlWebpackPlugin({ template: "./client/public/index.html", favicon: "./client/public/favicon.svg" }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

export default config;
