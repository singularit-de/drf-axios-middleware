import type {FilterSetConfig} from './types.js'
import {Exact, FilterSetRange, FilterSets, GTE, LTE} from './types.js'

// interface SimpleTypes {
//     isOnline:boolean
// }

interface Data {
    isOnline: boolean
    id?: number

    foo?: string
    bar: number
}

// interface Test extends FilterSetConfig<SimpleTypes>{
//     name: FilterSetAttribute<string, Exact> | string
//     id: FilterSetAttribute<number, [Exact, GTE, LTE]>
// }
//

const dummyName = 'dohu'
const dummyNumber = 11

interface FilterSetMapping {
    id: 'exact' | 'lte' | 'lt' | 'asd'
    bar: 'in' | 'foo'
}

interface CustomFilter {
    in: number[]
    foo:number
    // special: boolean
}

const foo: FilterSetConfig<Data, FilterSetMapping, CustomFilter> = {
    // foo: {in: ['a', 'b'] },
    id: {exact: 123},
    bar: {in: [89]},
    // bar: {value: 89},
    isOnline: {exact: true},
}

const fooo: FilterSetConfig<Data, FilterSetMapping> = {
    // foo: {in: ['a', 'b'] },
    id: {lte: 12, foo: 234},
    bar: {foo: 1},
    isOnline: {exact: true},
}

// const foo : FilterSetConfig<Data, FilterSetMapping, string> = {
//     // foo: {in: ['a', 'b'] },
//     id: {lte: 123, gte:123},
//     isOnline:{exact: true}
// }

console.log(foo)

// '?name=dohu&id__exact=11'
