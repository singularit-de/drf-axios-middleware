export const DRFFilters = ['in', 'exact', 'lt', 'gt', 'lte', 'gte', 'startswith', 'endswith']

/**
 *
 */
interface NotIn {
  in?: never
}

interface NotExact {
  exact?: never
}

export interface FilterSetExact<F> extends NotIn {
  exact: F
  startswith?: never
  endswith?: never
  lte?: never
  gte?: never
  lt?: never
  gt?: never
}

export interface FilterSetIn<F> extends NotExact {
  startswith?: never
  endswith?: never
  in: Array<F>
  lte?: never
  gte?: never
  lt?: never
  gt?: never
}

export interface FilterSetAffix<F> extends NotExact, NotIn {
  startswith?: F
  endswith?: F
}

type FilterSetRange<T> =
    (FilterSetRangeLT<T> & FilterSetRangeGTE<T>) | (FilterSetRangeLT<T> & FilterSetRangeGT<T>)
    | (FilterSetRangeLTE<T> & FilterSetRangeGTE<T>) | (FilterSetRangeLTE<T> & FilterSetRangeGT<T>)
    | (FilterSetRangeGT<T> & FilterSetRangeLTE<T>) | (FilterSetRangeGT<T> & FilterSetRangeLT<T>)
    | (FilterSetRangeGTE<T> & FilterSetRangeLTE<T>) | (FilterSetRangeGTE<T> & FilterSetRangeLT<T>)

export interface FilterSetRangeLT<T> extends FilterSetAffix<T> {
  lte?: never
  lt?: T
}

export interface FilterSetRangeLTE<T> extends FilterSetAffix<T> {
  lte?: T
  lt?: never
}

export interface FilterSetRangeGT<T> extends FilterSetAffix<T> {
  gte?: never
  gt?: T
}

export interface FilterSetRangeGTE<T> extends FilterSetAffix<T> {
  gte?: T
  gt?: never

}

/**
 * all FilterSets
 */
type FilterSet<T> = FilterSetRange<T> | FilterSetExact<T> | FilterSetAffix<T> | FilterSetIn<T>

// Config to exclude certain filters and enable custom filters
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FSKeyConfig<D> = Partial<Record<keyof D, any>>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomKeyConfig = Record<any, any>
& {
  [key in keyof FilterSet<unknown>]?: never
}

type AllowedFSKeys<D, K extends FSKeyConfig<D>, key extends keyof D, C extends CustomKeyConfig | null> =
    // we exclude the types from the custom config because they are defined there. If not they might allow wrong types
        (Exclude<K[key], keyof C> extends (string | number | symbol) ? Partial<Record<Exclude<K[key], keyof C>, D[key]>> : never)

type ConfiguredCustomKeys<D, K extends FSKeyConfig<D>, key extends keyof D, C extends CustomKeyConfig> =
    Extract<keyof C, K[key] extends (string | number | symbol) ? K[key] : never>

type CustomKey<D, K extends FSKeyConfig<D>, key extends keyof D, C extends CustomKeyConfig> =
  Partial<
      Record<
          ConfiguredCustomKeys<D, K, key, C> //
          , C[ConfiguredCustomKeys<D, K, key, C>]
      >
>

type CheckCustomKeys<D, K extends FSKeyConfig<D>, key extends keyof D, C extends CustomKeyConfig | null> =
  C extends null ?
    never
    : (
        keyof C extends K[keyof K] ? // check if there is a key that is not a default drf key
            (CustomKey<D, K, key, Exclude<C, null>>) // there is a custom key inside the key config
          : never
      )

type CheckConfigKeys<D, K extends FSKeyConfig<D>, key extends keyof D, C extends CustomKeyConfig | null> =
    key extends keyof K ? // check if there is a FSKeyConfig
        (
          CheckCustomKeys<D, K, key, C>
          | AllowedFSKeys<D, K, key, C> // every key that is defined in the config is allowed
        )
      : FilterSet<D[key]> // no config for the key so we take the default combinations

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FilterSetConfig<D = Record<any, any>, K extends FSKeyConfig<D> | null = null, C extends CustomKeyConfig | null = null> = {
  [key in keyof D]:
  {value: D[key]} // no filters apply
  | (
    K extends null ? // check if we have a config
      FilterSet<D[key]> // no config so we take the default combinations for each key
      : CheckConfigKeys<D, Exclude<K, null>, key, C> // check if key is inside the config
  ) | (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    D[key] extends (Record<any, any> | undefined) ? // check if the type of the key is a Record, so we add extended references
        (key extends keyof K ?
          FilterSetConfig<D[key], K[key]>
          : FilterSetConfig<D[key]>)
      : never // no types added otherwise
  )
}

/**
 * Internal Representation of a Filter
 */
export interface Filter {
  key: string
  value: unknown
}

/**
 *  @param key: the defined key
 *  @param data: the enclosing data containing the data of the key as well as other data on the same hierarchy
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FilterHandler = (key: string, value: any, filter: any) => Array<Filter>

/**
 *
 */
export interface DRFAxiosConfig {

  /**
   * A Record which contains for a filter the custom filter handler
   */
  filterHandlers?: Record<string, FilterHandler>

}
