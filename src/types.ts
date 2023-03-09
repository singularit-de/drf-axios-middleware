export interface FilterSetExact<F> {
  exact: F
  startswith?: never
  lte?: never
  gte?: never
  lt?: never
  gt?: never
}

export interface FilterSetStartsWith<F> {
  exact?: never
  startswith?: F
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

export interface FilterSetRangeLT<T> extends NotExact {
  lte?: never
  lt?: T
}

export interface FilterSetRangeLTE<T> extends NotExact {
  lte?: T
  lt?: never
}

export interface FilterSetRangeGT<T> extends NotExact {
  gte?: never
  gt?: T
}

export interface FilterSetRangeGTE<T> extends NotExact {
  gte?: T
  gt?: never

}

type FilterSet<T> = FilterSetRange<T> | FilterSetExact<T> | FilterSetStartsWith<T>

// Config to exclude certain filters and enable custom filters
type FSKeyConfig<D> = Partial<Record<keyof D, string>>

type CustomKeyConfig = {[key: string]: any}
& {
  [key in keyof FilterSet<unknown>]?: never
}

type AllowedFSKeys<D, K extends FSKeyConfig<D>, key extends keyof D> =
    K[key] extends (string | number | symbol) ? Partial<Record<K[key], D[key]>> : never

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
          | AllowedFSKeys<D, K, key> // every key that is defined in the config is allowed
        )
      : FilterSet<D[key]> // no config for the key so we take the default combinations

export type FilterSetConfig<D = Record<any, any>, K extends FSKeyConfig<D> | null = null, C extends CustomKeyConfig | null = null> = {
  [key in keyof D]:
  {value: D[key]} // no filters apply
  | (
    K extends null ? // check if we have a config
      FilterSet<D[key]> // no config so we take the default combinations for each key
      : CheckConfigKeys<D, Exclude<K, null>, key, C> // check if key is inside the config
  )
}

export interface DRFAxiosConfig {

  /** The name of the key where one can put their FilterSetConfig under.
   * This is needed to not coincidentally convert data that is not meant to be converted with this middleware.
   *
   */
  filterKey: string

}
