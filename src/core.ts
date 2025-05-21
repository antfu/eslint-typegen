import type { ESLint, Linter, Rule } from 'eslint'
import type { JSONSchema4 } from 'json-schema'
import type { Options as CompileOptions } from 'json-schema-to-typescript-lite'
import { compile as compileSchema, normalizeIdentifier } from 'json-schema-to-typescript-lite'

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
   * Augment the `DefaultConfigNamesMap` interface for `eslint-flat-config-utils`
   * For auto-completion of config names etc.
   *
   * @see https://github.com/antfu/eslint-flat-config-utils
   * @default false
   */
  augmentFlatConfigUtils?: boolean

  /**
   * The name of the exported type.
   *
   * @default 'RuleOptions'
   */
  exportTypeName?: string

  /**
   * Options for json-schema-to-typescript
   */
  compileOptions?: Partial<CompileOptions>
}

export interface FlatConfigsToPluginsOptions {
  filterConfig?: (config: Linter.Config) => boolean
  filterPlugin?: (name: string, plugin: ESLint.Plugin) => boolean
}

export interface FlatConfigsToRulesOptions
  extends RulesTypeGenOptions, FlatConfigsToPluginsOptions {
}

export async function flatConfigsToPlugins(
  configs: Linter.Config[],
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
  configs: Linter.Config[],
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
  options: RulesTypeGenOptions & { configNames?: string[] } = {},
) {
  const {
    includeTypeImports = true,
    includeIgnoreComments = true,
    includeAugmentation = true,
    augmentFlatConfigUtils = false,
    exportTypeName = 'RuleOptions',
    compileOptions = {},
    configNames = [],
  } = options

  const rules: [name: string, rule: Rule.RuleModule][] = []

  for (const [pluginName, plugin] of Object.entries(plugins)) {
    for (const [ruleName, rule] of Object.entries(plugin.rules || {})) {
      if (rule?.meta) {
        rules.push([
          pluginName
            ? `${pluginName}/${ruleName}`
            : ruleName,
          rule,
        ])
      }
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
          '',
          `declare module 'eslint' {`,
          `  namespace Linter {`,
          `    interface RulesRecord extends ${exportTypeName} {}`,
          `  }`,
          `}`,
        ]
      : []),
    ...(augmentFlatConfigUtils && configNames.length
      ? [
          '',
          '// @ts-ignore - In case the package is not installed',
          `declare module 'eslint-flat-config-utils' {`,
          `  interface DefaultConfigNamesMap {`,
          ...configNames.map(name => `    '${name}'?: true,`),
          `  }`,
          `}`,
        ]
      : []),
    '',
    `export interface ${exportTypeName} {`,
    ...resolved.flatMap(({ typeName, name, jsdoc }) => [
      jsdoc?.length
        ? `  /**\n${jsdoc.map(i => `   * ${i}`).join('\n').replaceAll(/\*\//g, '*\\/')}\n   */`
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
  ruleName: string,
  rule: Rule.RuleModule,
  compileOptions: Partial<CompileOptions> = {},
) {
  const meta = rule.meta ?? {}
  let schemas = meta.schema as JSONSchema4[] ?? []
  if (!Array.isArray(schemas))
    schemas = [schemas]

  const id = normalizeIdentifier(ruleName)

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
      name: ruleName,
      typeName: '[]',
      typeDeclarations: [],
    }
  }

  let lines: string[] = []

  const schema: JSONSchema4 = Array.isArray(meta.schema)
    ? { type: 'array', items: meta.schema, definitions: meta.schema?.[0]?.definitions }
    : meta.schema

  let overriddenRootSchemaId: string | undefined
  let isRootSchema = true

  try {
    const compiled = await compileSchema(schema, id, {
      unreachableDefinitions: false,
      strictIndexSignatures: true,
      customName(schema, keyName) {
        const canOverrideRootSchemaId = isRootSchema
        isRootSchema = false

        const resolved = schema.title || schema.$id || keyName
        if (resolved === id)
          return id
        if (!resolved)
          return undefined!

        const normalizedName = `_${normalizeIdentifier(`${id}_${resolved}`)}`
        if (canOverrideRootSchemaId)
          overriddenRootSchemaId = normalizedName

        return normalizedName
      },
      ...compileOptions,
    })
    lines.push(
      compiled
        .replace(/\/\*[\s\S]*?\*\//g, ''),
    )
  }
  catch (error) {
    console.warn(`Failed to compile schema ${ruleName} for rule ${ruleName}. Falling back to unknown.`)
    console.error(error)
    lines.push(`export type ${id} = unknown\n`)
  }

  lines = lines
    .join('\n')
    .split('\n')
    .map(line => line.replace(/^(export )/, ''))
    .filter(Boolean)

  lines.unshift(`// ----- ${ruleName} -----`)

  return {
    name: ruleName,
    jsdoc,
    typeName: overriddenRootSchemaId ?? id,
    typeDeclarations: lines,
  }
}
