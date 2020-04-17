/* config-overrides.js */
const { override, addLessLoader, addWebpackAlias } = require('customize-cra');
const path = require('path')

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
    }),
    addLessLoader({
      javascriptEnabled: true
    })
  )
};