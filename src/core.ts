import type { ESLint, Linter, Rule } from 'eslint'
import type { JSONSchema4 } from 'json-schema'
import { compile as compileSchema } from 'json-schema-to-typescript'

export interface RulesTypeGenOptions {
  /**
   * Insert type imports for the generated types.
   *
   * @default true
   */
  includeTypeImports?: boolean

  /**
   * Include comments to disable ESLint and Prettier.
   *
   * @default true
   */
  includeIgnoreComments?: boolean

  /**
   * Augment the interface to ESLint's `Linter.RulesRecord`.
   *
   * @default true
   */
  includeAugmentation?: boolean

  /**
   * The name of the exported type.
   *
   * @default 'RuleOptions'
   */
  exportTypeName?: string

  /**
   * Options for json-schema-to-typescript
   */
  compileOptions?: any // Partial<CompileOptions>
}

export interface FlatConfigsToPluginsOptions {
  filterConfig?: (config: Linter.FlatConfig) => boolean
  filterPlugin?: (name: string, plugin: ESLint.Plugin) => boolean
}

export interface FlatConfigsToRulesOptions
  extends RulesTypeGenOptions, FlatConfigsToPluginsOptions {
}

export async function flatConfigsToPlugins(
  configs: Linter.FlatConfig[],
  options: FlatConfigsToPluginsOptions = {},
) {
  const plugins: Record<string, ESLint.Plugin> = {}
  for (const config of configs) {
    if (!config.plugins)
      continue
    if (options.filterConfig?.(config) === false)
      continue
    for (const [name, plugin] of Object.entries(config.plugins)) {
      if (options.filterPlugin?.(name, plugin) === false)
        continue
      plugins[name] = plugin
    }
  }
  return plugins
}

/**
 * Generate types for rules from an array of ESLint configurations.
 */
export async function flatConfigsToRulesDTS(
  configs: Linter.FlatConfig[],
  options: FlatConfigsToRulesOptions = {},
) {
  return pluginsToRulesDTS(
    await flatConfigsToPlugins(configs, options),
    options,
  )
}

/**
 * Generate types for rule from an object of ESLint plugins.
 */
export async function pluginsToRulesDTS(
  plugins: Record<string, ESLint.Plugin>,
  options: RulesTypeGenOptions = {},
) {
  const {
    includeTypeImports = true,
    includeIgnoreComments = true,
    includeAugmentation = true,
    exportTypeName = 'RuleOptions',
    compileOptions = {},
  } = options

  const rules: [name: string, rule: Rule.RuleModule][] = []

  for (const pluginName in plugins) {
    const plugin = plugins[pluginName]
    for (const ruleName in plugin.rules) {
      const rule = plugin.rules[ruleName]
      if ('meta' in rule)
        rules.push([`${pluginName}/${ruleName}`, rule])
    }
  }

  rules.sort(([a], [b]) => a.localeCompare(b))
  const resolved = await Promise.all(rules
    .map(([name, rule]) => compileRule(name, rule, compileOptions)))

  const exports = [
    ...(includeIgnoreComments
      ? [
          '/* eslint-disable */',
          '/* prettier-ignore */',
        ]
      : []),
    ...(includeTypeImports
      ? [
          'import type { Linter } from \'eslint\'',
        ]
      : []),
    ...(includeAugmentation
      ? [
          `declare module 'eslint' {`,
          `  namespace Linter {`,
          `    interface RulesRecord extends ${exportTypeName} {}`,
          `  }`,
          `}`,
        ]
      : []),
    '',
    `export interface ${exportTypeName} {`,
    ...resolved.flatMap(({ typeName, name, jsdoc }) => [
      jsdoc?.length
        ? `  /**\n${jsdoc.map(i => `   * ${i}`).join('\n')}\n   */`
        : undefined,
      `  '${name}'?: Linter.RuleEntry<${typeName}>`,
    ]).filter(Boolean),
    `}`,
  ]
  const typeDeclarations = resolved.flatMap(({ typeDeclarations }) => typeDeclarations).join('\n')

  return [
    ...exports,
    '',
    '/* ======= Declarations ======= */',
    typeDeclarations,
  ].join('\n')
}

export async function compileRule(
  name: string,
  rule: Rule.RuleModule,
  compileOptions: Partial<any> = {},
) {
  const meta = rule.meta ?? {}
  let schemas = meta.schema as JSONSchema4[] ?? []
  if (!Array.isArray(schemas))
    schemas = [schemas]

  const capitalizedName = name.replace(/(?:^|[^\w]+)([a-z])/g, (_, c) => c.toUpperCase())

  const jsdoc: string[] = []
  if (meta.docs?.description)
    jsdoc.push(meta.docs.description)
  if (meta.docs?.url)
    jsdoc.push(`@see ${meta.docs.url}`)
  if (meta.deprecated)
    jsdoc.push('@deprecated')

  if (!meta.schema || !schemas.length) {
    return {
      jsdoc,
      name,
      typeName: '[]',
      typeDeclarations: [],
    }
  }

  async function compile(schema: JSONSchema4, name: string, ruleName: string) {
    try {
      const compiled = await compileSchema(schema, name, {
        bannerComment: '',
        format: 'style' in compileOptions,
        unreachableDefinitions: false,
        strictIndexSignatures: true,
        customName(schema, keyName) {
          const resolved = schema.title || schema.$id || keyName
          if (resolved === name)
            return name
          if (!resolved)
            return undefined!
          return `_${name}_${resolved}`
        },
        ...compileOptions,
      })
      return compiled
        .replace(/\/\*[\s\S]*?\*\//g, '')
    }
    catch (error) {
      console.warn(`Failed to compile schema ${name} for rule ${ruleName}. Falling back to unknown.`)
      console.error(error)
      return `export type ${name} = unknown\n`
    }
  }

  let lines: string[] = [
    await compile(
      Array.isArray(meta.schema)
        ? { type: 'array', items: meta.schema }
        : meta.schema,
      capitalizedName,
      name,
    ),
  ]

  lines = lines
    .join('\n')
    .split('\n')
    .map(line => line.replace(/^(export )/, ''))
    .filter(Boolean)

  lines.unshift(`// ----- ${name} -----`)

  return {
    name,
    jsdoc,
    typeName: capitalizedName,
    typeDeclarations: lines,
  }
}
