const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "production",
  devtool: false,
  target: "node",
  entry: ["./app.js"],
  output: {
    filename: "app.js",
    libraryTarget: "commonjs2",
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  ignoreWarnings: [/^(?!CriticalDependenciesWarning$)/],
  optimization: {
    nodeEnv: false,
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};
