import { expect, it } from 'vitest'
import { vue } from '@antfu/eslint-config'
import { flatConfigsToRulesDTS, pluginsToRulesDTS } from '../src/core'

it('pluginsToRuleOptions', async () => {
  expect(await pluginsToRulesDTS({
    // @ts-expect-error missing types
    import: await import('eslint-plugin-import-x').then(m => m.default),
    antfu: await import('eslint-plugin-antfu').then(m => m.default),
  }))
    .toMatchFileSnapshot('./output/plugins.d.ts')
})

it('pluginsToRuleOptions ts expect no warnings', async () => {
  await pluginsToRulesDTS({
    // @ts-expect-error missing types
    ts: await import('@typescript-eslint/eslint-plugin').then(m => m.default),
  })
})

it('core rules', async () => {
  const { builtinRules } = await import('eslint/use-at-your-own-risk')

  expect(await pluginsToRulesDTS({
    '': { rules: Object.fromEntries(builtinRules.entries()) },
  }))
    .toMatchFileSnapshot('./output/core-rules.d.ts')
})

it('flatConfigsToRuleOptions', async () => {
  expect(await flatConfigsToRulesDTS(await vue() as any))
    .toMatchFileSnapshot('./output/flat-config-vue.d.ts')
})

it('jsx-a11y', async () => {
  expect(await pluginsToRulesDTS({
    // @ts-expect-error missing types
    'jsx-a11y': await import('eslint-plugin-jsx-a11y').then(m => m.default),
  }))
    .toMatchFileSnapshot('./output/jsx-a11y.d.ts')
})
