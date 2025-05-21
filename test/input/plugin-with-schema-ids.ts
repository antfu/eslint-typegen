import type { ESLint, Rule } from 'eslint'

export const pluginWithSchemaIds: ESLint.Plugin = {
  rules: {
    'schema-with-id-at-root': {
      create: () => null as unknown as Rule.RuleListener,
      meta: {
        schema: {
          id: 'schemaId',
          type: 'object',
          additionalProperties: false,
          properties: {
            a: {
              id: 'aId',
              type: 'string',
            },
            b: {
              id: 'bId',
              additionalProperties: false,
              type: 'object',
              properties: {
                b1: {
                  type: 'string',
                },
              },
            },
            c: {
              additionalProperties: false,
              type: 'object',
              properties: {
                c1: {
                  type: 'string',
                  id: 'c1Id',
                },
              },
            },
            d: {
              additionalProperties: false,
              type: 'object',
              properties: {
                da: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  },
}
