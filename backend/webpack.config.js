const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { compilerOptions } = require('../tsconfig')

const baseUrl = path.resolve(process.cwd(), compilerOptions.baseUrl)

module.exports = {
  target: 'node',
  entry: path.resolve(__dirname, './server.ts'),
  output: {
    path: path.resolve(__dirname, '../dist/backend'),
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /^node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }]
            ]
          }
        }
      },
      {
        test: /\\.ts$/,
        exclude: /^node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: path.resolve(__dirname, '../tsconfig.json'),
          transpileOnly: true
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../tsconfig.json')
    })
  ],
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      ...Object.entries(compilerOptions.paths).reduce((obj, cv) => {
        const reg = new RegExp('\\/?\\*$')
        obj[cv[0].replace(reg, '')] = path.resolve(baseUrl, cv[1][0].replace(reg, ''))
        return obj
      }, {})
    }
  }
}
