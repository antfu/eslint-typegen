import type { ESLint, Rule } from 'eslint'

export const invalidJsonSchemaPlugin: ESLint.Plugin = {
  rules: {
    'invalid-json-schema-rule': {
      create: () => null as unknown as Rule.RuleListener,
      meta: {
        docs: {
          description: 'This rules points to a non-existing schema',
        },
        schema: {
          allOf: [
            {
              $ref: '#/definitions/some-definition-that-does-not-exist',
            },
          ],
          type: 'object',
        },
      },
    },
  },
}
