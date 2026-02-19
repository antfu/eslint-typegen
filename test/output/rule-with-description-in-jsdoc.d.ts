/* eslint-disable */
/* prettier-ignore */
import type { Linter } from 'eslint'

declare module 'eslint' {
  namespace Linter {
    interface RulesRecord extends RuleOptions {}
  }
}

export interface RuleOptions {
  'plugin/rule-with-description-in-properties-schema'?: Linter.RuleEntry<_PluginRuleWithDescriptionInPropertiesSchemaSchemaId>
}

/* ======= Declarations ======= */
// ----- plugin/rule-with-description-in-properties-schema -----
/**
 * This is a boolean property
 */
type _PluginRuleWithDescriptionInPropertiesSchemaAId = boolean
/**
 * This is a string property
 */
type _PluginRuleWithDescriptionInPropertiesSchemaBId = string
interface _PluginRuleWithDescriptionInPropertiesSchemaSchemaId {
  a?: _PluginRuleWithDescriptionInPropertiesSchemaAId
  b?: _PluginRuleWithDescriptionInPropertiesSchemaBId
}