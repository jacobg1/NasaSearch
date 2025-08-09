const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");

function getPlugins(mocks) {
  if (!mocks) return [];

  return [
    new CopyPlugin({
      patterns: [{ from: "./local/mocks/images", to: "./images" }],
    }),
  ];
}

module.exports = (env) => {
  return {
    mode: "production",
    devtool: false,
    target: "node",
    entry: ["./app.js"],
    output: {
      filename: "app.js",
      libraryTarget: "commonjs2",
      clean: true,
    },
    externalsPresets: { node: true },
    externals: [nodeExternals()],
    ignoreWarnings: [/^(?!CriticalDependenciesWarning$)/],
    optimization: {
      nodeEnv: false,
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: getPlugins(env.mocks),
  };
};
