const path = require('path')
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { compilerOptions } = require('../tsconfig')

const baseUrl = path.resolve(process.cwd(), compilerOptions.baseUrl)

module.exports = withTypescript({
  webpack(config, { dev, isServer }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      ...Object.entries(compilerOptions.paths).reduce((obj, cv) => {
        const reg = new RegExp('\\/?\\*$')
        obj[cv[0].replace(reg, '')] = path.join(baseUrl, cv[1][0].replace(reg, ''))
        return obj
      }, {})
    }

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
