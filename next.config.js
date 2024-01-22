const withPlugins = require('next-compose-plugins');
const withLess = require("next-with-less");

const nextConfig = {
  images: {
    disableStaticImages: true,
  },
  webpack: function (config) {
  config.module.rules.push({
    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|jpeg|gif)$/,
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
module.exports = withPlugins([[withLess, {
  lessLoaderOptions: {
    /* ... */
  },
}],], nextConfig);