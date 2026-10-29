/* eslint-disable */
/* prettier-ignore */
import type { Linter } from 'eslint'

declare module 'eslint' {
  namespace Linter {
    interface RulesRecord extends RuleOptions {}
  }
}

export interface RuleOptions {
  'plugin/ref-with-siblings'?: Linter.RuleEntry<PluginRefWithSiblings>
}

/* ======= Declarations ======= */
// ----- plugin/ref-with-siblings -----
type PluginRefWithSiblings = []|[{
  replacements?: _PluginRefWithSiblings_NameReplacements
  allowList?: _PluginRefWithSiblings_BooleanObject1
}]
interface _PluginRefWithSiblings_NameReplacements {
  [k: string]: (false | _PluginRefWithSiblings_BooleanObject) | undefined
}
interface _PluginRefWithSiblings_BooleanObject {
  [k: string]: boolean | undefined
}
interface _PluginRefWithSiblings_BooleanObject1 {
  [k: string]: boolean | undefined
}