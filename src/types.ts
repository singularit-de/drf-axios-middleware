export const Exact = 'exact'
export const LTE = 'lte'
export const LT = 'lt'
export const GTE = 'gte'
export const GT = 'gt'
export const IN = 'in'

export const FilterSets = [
    Exact,
    LTE,
    LT,
    GTE,
    GT,
] as const

export type FilterSets = typeof FilterSets[number]


export interface FilterSetExact<F extends unknown> {
    exact: F
    lte?: never
    gte?: never
    lt?: never
    gt?: never
}

type FilterSetRange<T> =
    (FilterSetRangeLT<T> & FilterSetRangeGTE<T>) | (FilterSetRangeLT<T> & FilterSetRangeGT<T>)
    | (FilterSetRangeLTE<T> & FilterSetRangeGTE<T>) | (FilterSetRangeLTE<T> & FilterSetRangeGT<T>)
    | (FilterSetRangeGT<T> & FilterSetRangeLTE<T>) | (FilterSetRangeGT<T> & FilterSetRangeLT<T>)
    | (FilterSetRangeGTE<T> & FilterSetRangeLTE<T>) | (FilterSetRangeGTE<T> & FilterSetRangeLT<T>)

interface NotExact {
    exact?: never
}

export interface FilterSetRangeLT<T extends unknown> extends NotExact {
    lte?: never
    lt?: T
}

export interface FilterSetRangeLTE<T extends unknown> extends NotExact {
    lte?: T
    lt?: never
}

export interface FilterSetRangeGT<T extends unknown> extends NotExact {
    gte?: never
    gt?: T
}

export interface FilterSetRangeGTE<T extends unknown> extends NotExact {
    gte?: T
    gt?: never

}


type FilterSet<D> = FilterSetRange<D> | FilterSetExact<D>
type FSKeyConfig<D> = Partial<Record<keyof D, string | keyof FilterSet<D>>>
type CustomKeyConfig = { [key: string]: any } & {
    [key in keyof FilterSetRange<unknown>]?: never
}
type CustomKeyExists<D, DKEY extends D[keyof D], C extends CustomKeyConfig> =
    Partial<Record<keyof C, C[keyof C]>>
    | FilterSet<DKEY>

type CustomKeyCheck<D, K extends FSKeyConfig<D>, key extends keyof D, C extends CustomKeyConfig, > =
    keyof C extends K[keyof K] ? (CustomKeyExists<D, D[key], C>) :
        'peter'
        // FilterSet<D[key]>
        // Partial<Record<Exclude<K[key], 'gte'|'lte'|'gt'|'lt'|'exact'>, D[key]>>
        // (K[key] extends keyof FilterSet<D[key]> ? 'hans': 'peter')
        // (KKEY extends keyof FilterSet<DKEY> ? FilterSet<DKEY>: Partial<Record<KKEY, DKEY>>)

export type FilterSetConfig<D, K extends FSKeyConfig<D>, C extends CustomKeyConfig = never> = {
    [key in keyof D]:
    { value: D[key] } //no filters apply
    | (key extends keyof K ? // is key part of FSKeyConfig
    (CustomKeyCheck<D, K, key, C>) : // check if we have customs keys
    (FilterSet<D[key]>)) // defaults
}

// export type FilterSetConfig<T, K extends Partial<Record<keyof T, string>>, P> = {
//     [key in keyof T]: { value: T[key] } | (key extends keyof K ? Partial<Record<K[key], T[key]>> : (FilterSetAttribute<T,T[key]> | FilterSetAttributeE<T,T[key]> | P))
// }