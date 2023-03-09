import type {FilterSetConfig} from './types.js'
import {

} from './types.js'

interface SimpleData {
  id: number
}

interface Data {
  id: number
  opt?: number
  new?: number
}

interface FilterSetMapping {
  id: 'exact' | 'lte' | 'lt' | 'gt'
  opt: 'lt' | 'exact'
}

const WrongValuePassing: FilterSetConfig<Data, FilterSetMapping> = {
  id: {value: '123'},
}

const OneMapping: FilterSetConfig<Data, FilterSetMapping> = {
  id: {exact: 123},
}

const OneDisallowedMapping: FilterSetConfig<Data, FilterSetMapping> = {
  id: {gte: 123},
}

const CorrectMultipleMapping: FilterSetConfig<Data, FilterSetMapping> = {
  id: {gt: 123, lt: 123},
}

const OpposingMultipleMapping: FilterSetConfig<Data, FilterSetMapping> = {
  id: {exact: 123, lt: 123},
}

const OpposingMultiple2Mapping: FilterSetConfig<Data, FilterSetMapping> = {
  id: {lte: 123, lt: 123},
}

const MissingRequired: FilterSetConfig<Data, FilterSetMapping> = {
  id: {value: 123},
  opt: {exact: 123},
}

const UnknownMapping: FilterSetConfig<Data, FilterSetMapping> = {
  id: {exact: 123},
  new: {exact: 456},
}

interface CustomFilter {
  in: any[]
  foo: number
  // special: boolean
}

interface CustomFilterSetMapping {
  id: 'exact' | 'lte' | 'lt' | 'gt' | 'in'
  opt: 'lt' | 'exact'
}

const UseCustomFilter: FilterSetConfig<Data, CustomFilterSetMapping, CustomFilter> = {
  // foo: {in: ['a', 'b'] },
  id: {in: []},
  bar: {in: [89]},
  // bar: {value: 89},
  isOnline: {exact: true},
}

const fooo: FilterSetConfig<Data, FilterSetMapping> = {
  // foo: {in: ['a', 'b'] },
  id: {foo: 234},
  bar: {foo: 1},
  isOnline: {exact: true},
}

const foooo: FilterSetConfig<Data, FilterSetMapping> = {
  id: {foo: 234},
}

// const foo : FilterSetConfig<Data, FilterSetMapping, string> = {
//     // foo: {in: ['a', 'b'] },
//     id: {lte: 123, gte:123},
//     isOnline:{exact: true}
// }

console.log(foo)

// '?name=dohu&id__exact=11'
