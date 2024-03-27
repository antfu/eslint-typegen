import { expect, it } from 'vitest'
import { vue } from '@antfu/eslint-config'
import { flatConfigsToRuleOptions, pluginsToRuleOptions } from '../src'

it('pluginsToRuleOptions', async () => {
  expect(await pluginsToRuleOptions({
    // @ts-expect-error missing types
    node: await import('eslint-plugin-n').then(m => m.default),
    // @ts-expect-error missing types
    import: await import('eslint-plugin-import-x').then(m => m.default),
  }))
    .toMatchSnapshot()
})

it('flatConfigsToRuleOptions', async () => {
  expect(await flatConfigsToRuleOptions(await vue() as any))
    .toMatchSnapshot()
})
