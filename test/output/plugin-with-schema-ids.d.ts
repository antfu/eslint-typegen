/* eslint-disable */
/* prettier-ignore */
import type { Linter } from 'eslint'

declare module 'eslint' {
  namespace Linter {
    interface RulesRecord extends RuleOptions {}
  }
}

export interface RuleOptions {
  'plugin/schema-with-id-at-root'?: Linter.RuleEntry<_PluginSchemaWithIdAtRootSchemaId>
}

/* ======= Declarations ======= */
// ----- plugin/schema-with-id-at-root -----
type _PluginSchemaWithIdAtRootAId = string
type _PluginSchemaWithIdAtRootC1Id = string
interface _PluginSchemaWithIdAtRootSchemaId {
  a?: _PluginSchemaWithIdAtRootAId
  b?: _PluginSchemaWithIdAtRootBId
  c?: {
    c1?: _PluginSchemaWithIdAtRootC1Id
  }
  d?: {
    da?: string
  }
}
interface _PluginSchemaWithIdAtRootBId {
  b1?: string
}