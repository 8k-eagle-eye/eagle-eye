const path = require('path')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = withTypescript({
  webpack(config, { dev, isServer }) {
    if (dev && isServer) {
      config.module.rules.push({
        enforce: 'pre',
        exclude: /(node_modules)/,
        loader: 'eslint-loader',
        test: /\.(js|jsx|ts|tsx)$/
      })
    }

    if (isServer) {
      config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
          tsconfig: path.join(__dirname, './tsconfig.json')
        })
      )
    }

    return config
  }
})
