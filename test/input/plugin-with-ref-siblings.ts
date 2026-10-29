import type { ESLint, Rule } from 'eslint'

// Mirrors `unicorn/prevent-abbreviations`: the same definition is referenced
// both by a plain `$ref` and by a `$ref` with sibling keywords
export const pluginWithRefSiblings: ESLint.Plugin = {
  rules: {
    'ref-with-siblings': {
      create: () => null as unknown as Rule.RuleListener,
      meta: {
        schema: {
          type: 'array',
          additionalItems: false,
          items: [
            {
              type: 'object',
              additionalProperties: false,
              properties: {
                replacements: {
                  $ref: '#/definitions/nameReplacements',
                },
                allowList: {
                  $ref: '#/definitions/booleanObject',
                  description: 'Custom allow list of names.',
                },
              },
            },
          ],
          definitions: {
            nameReplacements: {
              type: 'object',
              additionalProperties: {
                anyOf: [
                  { enum: [false] },
                  { $ref: '#/definitions/booleanObject' },
                ],
              },
            },
            booleanObject: {
              type: 'object',
              additionalProperties: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
}
