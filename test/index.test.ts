import { expect, it } from 'vitest'
import { pluginsToRuleOptions } from '../src'

it('pluginsToRulesOptions', async () => {
  expect(await pluginsToRuleOptions({
    // @ts-expect-error missing types
    node: await import('eslint-plugin-n').then(m => m.default),
    // @ts-expect-error missing types
    import: await import('eslint-plugin-import-x').then(m => m.default),
  }))
    .toMatchSnapshot()
})
