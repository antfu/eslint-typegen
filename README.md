# eslint-typegen

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Generate types from ESLint rules schema

## Usage

```bash
npm i eslint-typegen
```

```ts
import fs from 'node:fs/promises'
import { pluginsToRulesOptions } from 'eslint-typegen'
import pluginTs from '@typescript-eslint/eslint-plugin'
import pluginN from 'eslint-plugin-n'

const dts = await pluginsToRulesOptions({
  '@typescript-eslint': pluginTs,
  'n': pluginN,
})

await fs.writeFile('eslint-rules.d.ts', dts)
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
