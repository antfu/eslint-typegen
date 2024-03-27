// @ts-check
/// <reference path="./eslint-typegen.d.ts" />
import antfu from '@antfu/eslint-config'
// eslint-disable-next-line antfu/no-import-dist
import typegen from './dist/index.mjs'

export default typegen(antfu(
  {
    rules: {
    },
  },
))
