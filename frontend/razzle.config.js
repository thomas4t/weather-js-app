/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const get = require('lodash/fp/get')
const LoadableWebpackPlugin = require('@loadable/webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const nodeExternals = require('webpack-node-externals')

const alias = {
  '@packages': path.resolve(__dirname, 'src/@packages'),
  '@components': path.resolve(__dirname, 'src/components'),
  '@layouts': path.resolve(__dirname, 'src/layouts'),
  '@utils': path.resolve(__dirname, 'src/utils'),
  '@HoC': path.resolve(__dirname, 'src/HoC'),
  '@hooks': path.resolve(__dirname, 'src/hooks'),
  '@store': path.resolve(__dirname, 'src/store'),
  '@locale': path.resolve(__dirname, 'src/locale'),
  '@pages': path.resolve(__dirname, 'src/pages'),
  '@typings': path.resolve(__dirname, 'src/typings'),
  '@queries': path.resolve(__dirname, 'src/queries'),
}

module.exports = {
  alias, // for use in storybook webpack config
  modifyWebpackConfig({
    env: {
      target, // the target 'node' or 'web'
      dev, // is this a development build? true or false
    },
    webpackConfig, // the created webpack config
    webpackObject, // the imported webpack node module
    options: {
      pluginOptions, // the options passed to the plugin ({ name:'pluginname', options: { key: 'value'}})
      razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
      webpackOptions, // the modified options that was used to configure webpack/ webpack loaders and plugins
    },
    paths, // the modified paths that will be used by Razzle.
  }) {
    // aliases
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      ...alias,
    }

    // auto React import => no longer need to import React in components
    webpackConfig.plugins.push(
      new webpackObject.ProvidePlugin({
        React: 'react',
      }),
    )

    // code splitting
    if (target === 'web') {
      const filename = path.resolve(__dirname, 'build')
      webpackConfig.plugins.push(
        new LoadableWebpackPlugin({
          outputAsset: false,
          writeToDisk: { filename },
        }),
      )
    }

    // Not occurred anymore
    // @see https://github.com/neverendingqs/netlify-express/issues/4
    // if (target === 'node') {
    //   webpackConfig.externals = [nodeExternals()]
    // }

    // analyze
    if (target === 'web' && !dev) {
      webpackConfig.plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'static' }))
    }
    // configure Terser plugin to strip console.log, warn, etc.
    if (target === 'web' && !dev) {
      const terserPlugin = get('optimization.minimizer', webpackConfig).find(
        (plugin) => get('constructor.name', plugin) === 'TerserPlugin',
      )
      terserPlugin.options.terserOptions = {
        ...terserPlugin.options.terserOptions,
        compress: {
          drop_console: true,
        },
      }
    }

    return webpackConfig
  },
  options: {
    // verbose: true,
  },
}
