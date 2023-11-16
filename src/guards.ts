import type {
  FilterSet,
  FilterSetAffix,
  FilterSetConfig,
  FilterSetExact,
  FilterSetIn,
  FilterSetRange,
  FilterSetValue,
} from './types'
import {DRFFilters} from './types'

export function isFilterSetValue<K>(config: FilterSetValue<K> | FilterSet<K> | Partial<Record<string, K>> | FilterSetConfig<K>): config is FilterSetValue<K> {
  return (config as FilterSetValue<K>).value !== undefined
}

export function isFilterSetConfig<K>(config: FilterSetValue<K> | FilterSet<K> | FilterSetConfig<K>): config is FilterSetConfig<K> {
  const keys = Object.keys(config)
  const attributes = keys.filter(item => !DRFFilters.includes(item) && item !== 'value') // exclude all default drf Filters and value
  return attributes.length > 0
}

export function isFilterSetRange<K>(config: FilterSetValue<K> | FilterSet<K> | FilterSetConfig<K>): config is FilterSetRange<K> {
  const keys = Object.keys(config)
  const rangeKeys = ['lt', 'gt', 'lte', 'gte']
  const attributes = keys.filter(item => rangeKeys.includes(item)) // exclude all default drf Filters
  return attributes.length > 0
}

export function isFilterSetExact<K>(config: FilterSetValue<K> | FilterSet<K> | FilterSetConfig<K>): config is FilterSetExact<K> {
  return (config as FilterSetExact<K>).exact !== undefined
}

export function isFilterSetIn<K>(config: FilterSetValue<K> | FilterSet<K> | FilterSetConfig<K>): config is FilterSetIn<K> {
  return (config as FilterSetIn<K>).in !== undefined
}

export function isFilterSetAffix<K>(config: FilterSetValue<K> | FilterSet<K> | FilterSetConfig<K>): config is FilterSetAffix<K> {
  return (config as FilterSetAffix<K>).startswith !== undefined || (config as FilterSetAffix<K>).endswith !== undefined
}
