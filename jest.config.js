const path = require('path')
const { compilerOptions } = require('./tsconfig')

const baseUrl = path.resolve(process.cwd(), compilerOptions.baseUrl)

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    ...Object.entries(compilerOptions.paths).reduce((obj, cv) => {
      const reg = new RegExp('\\/?\\*$')
      const key = cv[0].replace(reg, '')
      const value = cv[1][0].replace(reg, '')

      if (/^.*(?<!\/\*)$/.test(cv[0])) {
        obj[`^${key}$`] = `${path.join(baseUrl, value)}`
      }

      if (/\*$/.test(cv[0])) {
        obj[`^${key}/(.*)`] = `${path.join(baseUrl, value)}/$1`
      }

      return obj
    }, {})
  }
}
