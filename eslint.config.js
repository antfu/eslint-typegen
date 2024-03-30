// @ts-check
/// <reference path="./eslint-typegen.d.ts" />
import antfu from '@antfu/eslint-config'
// eslint-disable-next-line antfu/no-import-dist
import typegen from './dist/index.mjs'

export default typegen(antfu({
  vue: true,
  typescript: true,
}))

/**
 * @type {import('eslint').Linter.FlatConfig}
 */
// eslint-disable-next-line unused-imports/no-unused-vars
const config = {
  rules: {
  },
}
