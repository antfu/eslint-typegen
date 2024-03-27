import { expect, it } from 'vitest'
import { vue } from '@antfu/eslint-config'
import { flatConfigsToRulesDTS, pluginsToRulesDTS } from '../src/core'

it('pluginsToRuleOptions', async () => {
  expect(await pluginsToRulesDTS({
    // @ts-expect-error missing types
    node: await import('eslint-plugin-n').then(m => m.default),
    // @ts-expect-error missing types
    import: await import('eslint-plugin-import-x').then(m => m.default),
  }))
    .toMatchSnapshot()
})

it('flatConfigsToRuleOptions', async () => {
  expect(await flatConfigsToRulesDTS(await vue() as any))
    .toMatchSnapshot()
})
