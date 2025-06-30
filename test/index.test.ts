import { vue } from '@antfu/eslint-config'
import { expect, it } from 'vitest'
import { flatConfigsToRulesDTS, pluginsToRulesDTS } from '../src/core'
import { invalidJsonSchemaPlugin } from './input/invalid-json-schema-plugin'
import { pluginWithSchemaIds } from './input/plugin-with-schema-ids'

it('pluginsToRuleOptions', async () => {
  await expect(await pluginsToRulesDTS({
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

  await expect(await pluginsToRulesDTS({
    '': { rules: Object.fromEntries(builtinRules.entries()) },
  }))
    .toMatchFileSnapshot('./output/core-rules.d.ts')
})

it('invalid JSON schema plugin', async () => {
  await expect(await pluginsToRulesDTS({
    'invalid-json-schema-plugin': invalidJsonSchemaPlugin,
  }))
    .toMatchFileSnapshot('./output/invalid-json-schema-plugin.d.ts')
})

it('json schema with ids', async () => {
  await expect(await pluginsToRulesDTS({
    plugin: pluginWithSchemaIds,
  }))
    .toMatchFileSnapshot('./output/plugin-with-schema-ids.d.ts')
})

it('flatConfigsToRuleOptions', async () => {
  await expect(await flatConfigsToRulesDTS(await vue() as any))
    .toMatchFileSnapshot('./output/flat-config-vue.d.ts')
})

it('jsx-a11y', async () => {
  await expect(await pluginsToRulesDTS({
    // @ts-expect-error missing types
    'jsx-a11y': await import('eslint-plugin-jsx-a11y').then(m => m.default),
  }))
    .toMatchFileSnapshot('./output/jsx-a11y.d.ts')
})

it('no rule `meta`', async () => {
  await expect(await pluginsToRulesDTS({
    // @ts-expect-error missing types
    'you-dont-need-lodash-underscore': await import('eslint-plugin-you-dont-need-lodash-underscore').then(m => m.default),
  }))
    .toMatchFileSnapshot('./output/no-rule-meta.d.ts')
})
