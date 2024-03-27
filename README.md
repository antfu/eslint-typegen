# eslint-typegen

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Generate types from ESLint rule schemas automatically, with auto-completion and type-checking for rule options.

![](https://github.com/antfu/eslint-typegen/assets/11247099/642ffdc0-c662-4f3b-9237-16d776be1c3e)

## Usage

```bash
npm i eslint-typegen
```

In your `eslint.config.mjs`, wrap the export with `typegen` function:

```ts
// @ts-check
/// <reference path="./eslint-typegen.d.ts" />
import typegen from 'eslint-typegen'

export default typegen(
  [
    // ...your normal eslint flat config
  ]
)
```

Run ESLint once, an `eslint-typegen.d.ts` file will be generated to augment ESLint's `Linter.RulesRecord` types, to provide you with auto-completion and type-checking for your ESLint rules configuration based on the ESLint plugins you are using.

> It will caluclate the hash from the plugins in your flat config, and only regenerate the types when the hash changes. If you want to force regenerate the types, you can delete the `eslint-typegen.d.ts` file and run ESLint again.

## Low-level API

You can find low-level APIs in the `eslint-typegen/core` modules.

```ts
import fs from 'node:fs/promises'
import { pluginsToRulesDTS } from 'eslint-typegen/core'
import pluginTs from '@typescript-eslint/eslint-plugin'
import pluginN from 'eslint-plugin-n'

const dts = await pluginsToRulesDTS({
  '@typescript-eslint': pluginTs,
  'n': pluginN,
})

await fs.writeFile('eslint-typegen.d.ts', dts)
```

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## Credits

The initial idea comes from [@Shinigami92](https://github.com/Shinigami92) via [this PR](https://github.com/eslint-stylistic/eslint-stylistic/pull/14), thanks to him!

## License

[MIT](./LICENSE) License © 2023-PRESENT [Anthony Fu](https://github.com/antfu)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/eslint-typegen?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/eslint-typegen
[npm-downloads-src]: https://img.shields.io/npm/dm/eslint-typegen?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/eslint-typegen
[bundle-src]: https://img.shields.io/bundlephobia/minzip/eslint-typegen?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=eslint-typegen
[license-src]: https://img.shields.io/github/license/antfu/eslint-typegen.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/eslint-typegen/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/eslint-typegen
