import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/core',
  ],
  declaration: 'node16',
  clean: true,
  externals: [
    'eslint',
  ],
})
