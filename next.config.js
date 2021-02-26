const withSass = require("@zeit/next-sass");
const withFonts = require("next-fonts");
const withCss = require("@zeit/next-css");
const withPurgeCss = require("next-purgecss");
const TerserPlugin = require("terser-webpack-plugin");
// const withOffline = require("next-offline");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const withImages = require('next-images');
const prod = process.env.NODE_ENV == 'production'
const nextConfig = {
  enableSvg: true,
  webpack(config, options) {
    config.optimization.minimize = prod;
    config.optimization.minimizer.push(new TerserPlugin());

    config.optimization.minimizer.push(
      new OptimizeCSSAssetsPlugin({})
    );

    return config;
  }
};

const loadNextPlugins = (n, l = 0) =>
  n.length - 1 === l ? n[l](nextConfig) : n[l](loadNextPlugins(n, l + 1));

const plugins = [
  withCss,
  // withPurgeCss,
  withFonts,
  withSass,
  withImages,
];

module.exports = loadNextPlugins(plugins);
