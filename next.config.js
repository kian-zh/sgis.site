const withPlugins = require('next-compose-plugins');
const less = require("@zeit/next-less")
const css = require("@zeit/next-css")

const nextConfig = {
  webpack: function (config) {
  config.module.rules.push({
    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
    use: {
    loader: 'url-loader',
      options: {
        limit: 100000,
        name: '[name].[ext]'
      }
    }
  })
  return config
  }
}

module.exports = withPlugins([
  [css, {
     cssModules: true
   }],
  [less, {
     cssModules: true
   }]
], nextConfig);