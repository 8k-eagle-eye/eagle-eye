require('dotenv').config()

const path = require('path')
const Dotenv = require('dotenv-webpack')
const { compilerOptions } = require('../tsconfig')

const baseUrl = path.resolve(process.cwd(), compilerOptions.baseUrl)

/**
 * @typedef { import('webpack').Configuration } WebpackConfiguration
 * @typedef {{
 *   buildId: string,
 *   dev: boolean,
 *   isServer: boolean,
 *   defaultLoaders: Object<string, any>
 * }} WebpackOptions
 */
module.exports = {
  /**
   * @param { WebpackConfiguration } config
   * @param { WebpackOptions } options
   * @returns { WebpackConfiguration }
   */
  webpack(config, { dev, isServer }) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1000,
          publicPath: '/_next/static/images',
          outputPath: 'static/images',
          name: '[name].[hash:7].[ext]'
        }
      }
    })

    config.plugins = [
      ...(config.plugins || []),
      new Dotenv({
        path: path.resolve(__dirname, '../.env'),
        systemvars: process.env.SYSTEMVARS_ENABLED === 'true'
      })
    ]

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ...Object.entries(compilerOptions.paths).reduce((obj, cv) => {
        const reg = new RegExp('\\/?\\*$')
        obj[cv[0].replace(reg, '')] = path.resolve(baseUrl, cv[1][0].replace(reg, ''))
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

    return config
  }
}
