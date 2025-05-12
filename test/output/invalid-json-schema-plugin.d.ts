/* eslint-disable */
/* prettier-ignore */
import type { Linter } from 'eslint'

declare module 'eslint' {
  namespace Linter {
    interface RulesRecord extends RuleOptions {}
  }
}

export interface RuleOptions {
  /**
   * This rules points to a non-existing schema
   */
  'invalid-json-schema-plugin/invalid-json-schema-rule'?: Linter.RuleEntry<InvalidJsonSchemaPluginInvalidJsonSchemaRule>
}

/* ======= Declarations ======= */
// ----- invalid-json-schema-plugin/invalid-json-schema-rule -----
type InvalidJsonSchemaPluginInvalidJsonSchemaRule = unknown