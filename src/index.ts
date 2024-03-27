import type { ESLint, Rule } from 'eslint'
import type { JSONSchema4 } from 'json-schema'
import { compile as compileSchema } from 'json-schema-to-typescript'

export async function pluginsToRulesOptions(plugins: Record<string, ESLint.Plugin>) {
  const options: ReturnType<typeof ruleToOptions>[] = []
  for (const pluginName in plugins) {
    const plugin = plugins[pluginName]
    for (const ruleName in plugin.rules) {
      const rule = plugin.rules[ruleName]
      if ('meta' in rule)
        options.push(ruleToOptions(`${pluginName}/${ruleName}`, rule))
    }
  }

  const resolved = await Promise.all(options)

  const exports = [
    'import type { Linter } from \'eslint\'',
    `export interface RulesOptions {`,
    ...resolved.flatMap(({ typeName, name, jsdoc }) => [
      jsdoc?.length
        ? `  /**\n${jsdoc.map(i => `   * ${i}`).join('\n')}\n   */`
        : undefined,
      `  '${name}'?: Linter.RuleEntry<${typeName}>`,
    ]).filter(Boolean),
    `}`,
  ].join('\n')
  const typeDeclrations = resolved.flatMap(({ typeDeclrations }) => typeDeclrations).join('\n')

  return [
    exports,
    '',
    '/** ===== Declrations ===== **/',
    typeDeclrations,
  ].join('\n')
}

export async function ruleToOptions(name: string, rule: Rule.RuleModule) {
  const meta = rule.meta ?? {}
  let schemas = meta.schema as JSONSchema4[] ?? []
  if (!Array.isArray(schemas))
    schemas = [schemas]

  const capitalizedName = name.replace(/(?:^|[^\w]+)([a-z])/g, (_, c) => c.toUpperCase())

  if (!schemas.length) {
    return {
      name,
      typeName: '[]',
      typeDeclrations: [],
    }
  }

  const lines = (await Promise.all(schemas.map(async (schema, index) => {
    schema = JSON.parse(JSON.stringify(schema).replace(/\#\/items\/0\/\$defs\//g, '#/$defs/'))

    try {
      const compiled = await compileSchema(schema, `_${capitalizedName}${index}`, {
        bannerComment: '',
        style: {
          semi: false,
          singleQuote: true,
        },
      })
      return compiled
    }
    catch (error) {
      console.warn(`Failed to compile schema #${index} for rule ${name}. Falling back to unknown.`)
      return `export type ${capitalizedName}${index} = unknown\n`
    }
  })))
    .join('\n')
    .split('\n')
    .map(line => line.replace(/^(export )/, ''))
    .filter(Boolean)

  if (Array.isArray(meta.schema))
    lines.push(`type ${capitalizedName} = [${schemas.map((_, index) => `_${capitalizedName}${index}`).join(', ')}]`)
  else
    lines.push(`type ${capitalizedName} = _${capitalizedName}0`)

  const jsdoc: string[] = []

  if (meta.docs?.description)
    jsdoc.push(meta.docs.description)
  if (meta.docs?.url)
    jsdoc.push(`@see ${meta.docs.url}`)
  if (meta.deprecated)
    jsdoc.push('@deprecated')

  lines.unshift(`/** ----- ${name} ----- **/`)

  return {
    name,
    jsdoc,
    typeName: capitalizedName,
    typeDeclrations: lines,
  }
}
