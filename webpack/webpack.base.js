const { NODE_ENV, IS_DEV } = require('./env');
const getPlugins = require('./plugins');
const devServer = require('./devServer');
const rules = require('./rules');
const optimization = require('./optimization');
const alias = require('./alias');
const { relativeRoot } = require('./utils');

module.exports = (env) => ({
  mode: NODE_ENV,
  resolve: {
    alias,
    extensions: ['.js', '.ts', '.tsx', '.css'],
  },
  entry: IS_DEV ? relativeRoot('src/StorybookIndex.tsx') : relativeRoot('src/index.tsx'),
  output: {
    path: relativeRoot('build'),
    filename: IS_DEV ? '[name].js' : 'ostis-ui-lib.js',
    libraryTarget: 'umd',
  },
  optimization,
  devServer,
  devtool: IS_DEV ? 'inline-source-map' : 'hidden-nosources-source-map',
  plugins: getPlugins(env),
  module: {
    rules,
  },
  externals: IS_DEV ? undefined : ['react', 'react-dom', 'ts-sc-client', 'styled-components'],
});
