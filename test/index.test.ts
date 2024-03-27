import { expect, it } from 'vitest'
import { vue } from '@antfu/eslint-config'
import { flatConfigsToRulesDTS, pluginsToRulesDTS } from '../src/core'

it('pluginsToRuleOptions', async () => {
  expect(await pluginsToRulesDTS({
    // @ts-expect-error missing types
    import: await import('eslint-plugin-import-x').then(m => m.default),
    antfu: await import('eslint-plugin-antfu').then(m => m.default),
  }, {
    compileOptions: {
      style: {
        printWidth: 1_000,
        tabWidth: 2,
        singleQuote: true,
      },
    },
  }))
    .toMatchSnapshot()
})

it('pluginsToRuleOptions ts expect no warnings', async () => {
  await pluginsToRulesDTS({
    // @ts-expect-error missing types
    ts: await import('@typescript-eslint/eslint-plugin').then(m => m.default),
  })
})

it('flatConfigsToRuleOptions', async () => {
  expect(await flatConfigsToRulesDTS(await vue() as any))
    .toMatchSnapshot()
})
