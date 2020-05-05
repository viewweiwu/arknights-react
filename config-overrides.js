/* config-overrides.js */
const { override, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path')

module.exports = {
  paths: function (paths) {
    paths.publicUrlOrPath = './'
    paths.appBuild = path.resolve(__dirname, 'dist')
    return paths
  },
  webpack: override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
    }),
    addLessLoader({
      javascriptEnabled: true
    })
  )
};