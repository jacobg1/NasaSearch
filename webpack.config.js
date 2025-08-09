const TerserPlugin = require("terser-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const CopyPlugin = require("copy-webpack-plugin");
const { IgnorePlugin } = require("webpack");

function getCopyPlugin(mocks) {
  if (!mocks) return [];

  return [
    new CopyPlugin({
      patterns: [{ from: "./local/mocks/images", to: "./images" }],
    }),
  ];
}

function getIgnorePlugin(mocks) {
  if (mocks) return [];

  return [
    new IgnorePlugin({
      checkResource(resource) {
        if (resource.includes("/mocks/")) {
          return true;
        }
        return false;
      },
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
    plugins: [...getCopyPlugin(env.mocks), ...getIgnorePlugin(env.mocks)],
  };
};
