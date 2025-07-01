/* eslint-disable */
/* prettier-ignore */
import type { Linter } from 'eslint'

declare module 'eslint' {
  namespace Linter {
    interface RulesRecord extends RuleOptions {}
  }
}

export interface RuleOptions {
  'you-dont-need-lodash-underscore/all'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/any'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/assign'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/bind'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/capitalize'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/cast-array'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/clone-deep'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/collect'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/concat'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/contains'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/defaults'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/detect'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/drop'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/drop-right'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/each'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/ends-with'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/entries'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/every'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/extend-own'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/fill'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/filter'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/find'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/find-index'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/first'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/flatten'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/foldl'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/foldr'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/for-each'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/get'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/head'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/includes'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/index-of'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/inject'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/is-array'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/is-array-buffer'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/is-date'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/is-finite'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/is-function'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/is-integer'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/is-nan'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/is-nil'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/is-null'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/is-string'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/is-undefined'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/join'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/keys'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/last'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/last-index-of'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/map'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/omit'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/pad-end'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/pad-start'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/pairs'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/reduce'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/reduce-right'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/repeat'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/replace'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/reverse'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/select'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/size'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/slice'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/some'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/split'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/starts-with'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/take-right'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/throttle'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/to-lower'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/to-pairs'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/to-upper'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/trim'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/union-by'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/uniq'?: Linter.RuleEntry<[]>
  'you-dont-need-lodash-underscore/values'?: Linter.RuleEntry<[]>
}

/* ======= Declarations ======= */
