import type {AxiosInstance} from 'axios'
import type {CustomKeyConfig, DRFAxiosConfig, FSKeyConfig, Filter, FilterHandler, FilterSetConfig} from './types'
import {DRFFilters} from './types'

/**
 * The default config
 */
const defaultConfig: DRFAxiosConfig = {
  filterHandlers: undefined,
}

/**
 *Convenience method to set a filter key.
 *
 * @param object
 * @param key
 * @param value
 */
function addFilterKey(object: Record<string, unknown>, key: string, value: unknown) {
  object[key] = value
}

/**
 *
 * @param key
 * @param data
 * @param filterHandlers
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseFilters(key: string, data: Record<string, any>, filterHandlers?: Record<string, FilterHandler>): Array<Filter> {
  const filters: Array<Filter> = []
  for (const filterSuffix in data) {
    if ('value' in data) { // plain filter
      filters.push({key, value: data.value})
    }
    else if (filterHandlers && (filterSuffix in filterHandlers)) {
      // user set a custom handler for this key, so we give him the data and expect him to return a valid filter.
      filterHandlers[filterSuffix](filterSuffix, data[filterSuffix], data).forEach((filter) => {
        filters.push({key: `${key}__${filter.key}`, value: filter.value})
      })
    }
    else {
      const filterValue = data[filterSuffix]
      if (
        !DRFFilters.includes(filterSuffix) // if the filter is part of the drf-filters we can just append it as we know how to handle these
          && !Array.isArray(filterValue) // arrays are objects as well, but we don't want to go deeper into them as we know how to handle these
          && typeof filterValue === 'object') {
        // got some more parsing to do
        parseFilters(filterSuffix, filterValue as Record<string, unknown>, filterHandlers).forEach((filter) => {
          filters.push({key: `${key}__${filter.key}`, value: filter.value})
        })
      }
      else {
        // no complex objects just plain filters
        const filterKey = `${key}__${filterSuffix}`
        filters.push({key: filterKey, value: filterValue})
      }
    }
  }
  return filters
}

/**
 *
 * @param config
 * @param filterSetHandlers
 */
export function convertFilterSetConfig<D, K extends FSKeyConfig<D> | null, C extends CustomKeyConfig | null>(
  config: FilterSetConfig<D, K, C>,
  filterSetHandlers?: Record<string, FilterHandler>,
) {
  const conversion = {}
  for (const key in config) {
    const entry = config[key]
    parseFilters(key, entry, filterSetHandlers).forEach((filter) => {
      addFilterKey(conversion, filter.key, filter.value)
    })
  }
  return conversion
}

export const applyDRFInterceptor = (axios: AxiosInstance, options: DRFAxiosConfig = defaultConfig) => {
  axios.interceptors.request.use(
    (config) => {
      if (config.method === 'get') {
        const filterSet = config.filterSet
        if (filterSet) {
          const filterSetParams = convertFilterSetConfig(filterSet as FilterSetConfig, options.filterHandlers)
          config.params = {...filterSetParams, ...config.params}
        }
      }
      return config
    },
  )
  return axios
}

