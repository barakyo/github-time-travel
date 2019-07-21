const path = require("path");

const IS_PROD = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.ts",
  mode: IS_PROD ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
