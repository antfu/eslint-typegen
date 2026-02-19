import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/core.ts',
  ],
  format: ['esm'],
  dts: true,
  exports: true,
  external: [
    'eslint',
  ],
})
