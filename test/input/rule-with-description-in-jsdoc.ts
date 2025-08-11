import type { ESLint, Rule } from 'eslint'

export const ruleWithDescriptionInJsdoc: ESLint.Plugin = {
  rules: {
    'rule-with-description-in-properties-schema': {
      create: () => null as unknown as Rule.RuleListener,
      meta: {
        schema: {
          id: 'schemaId',
          type: 'object',
          additionalProperties: false,
          properties: {
            a: {
              id: 'aId',
              type: 'boolean',
              default: false,
              description: 'This is a boolean property',
            },
            b: {
              id: 'bId',
              type: 'string',
              default: 'default',
              description: 'This is a string property',
            },
          },
        },
      },
    },
  },
}
