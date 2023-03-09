import type {Axios, AxiosInstance} from 'axios'
import type {DRFAxiosConfig, FilterSetConfig} from './types.js'

function addFilterKey(object: unknown, key: string, value: any) {
  // @ts-expect-error we don't know the type at this point
  object[key] = value
}

/**
 *
 * @param config
 */
export function convertFilterSetConfig(config: FilterSetConfig<any, any, any>) {
  const conversion = {}
  for (const key in config) {
    const entry = config[key]
    if ('value' in entry) { // plain filter
      addFilterKey(conversion, key, entry.value)
    }
    else { // custom or complex filter
      for (const filterSuffix in entry) {
        const filterKey = `${key}__${filterSuffix}`
        // @ts-expect-error can be any type
        const filterValue = entry[filterSuffix]
        addFilterKey(conversion, filterKey, filterValue)
      }
    }
  }
  return conversion
}

/**
 * The default config
 */
const defaultConfig: DRFAxiosConfig = {
  filterKey: 'filterSet',

}

export const applyDRFInterceptor = (axios: AxiosInstance, options: DRFAxiosConfig = defaultConfig) => {
  axios.interceptors.request.use(
    (config) => {
      if (config.method === 'get') {
        const params = config.params
        for (const key in params) {
          // check for FilterSetConfig
          if (params[key] instanceof Object && key === options.filterKey) {
            const filterSet = params[key]
            if (filterSet) {
              delete params[key]
              const filterSetParams = convertFilterSetConfig(filterSet as FilterSetConfig<any>)
              config.params = {...params, ...filterSetParams}
              break
            }
          }
          else {
            // TODO if there is no filter key then we assume that the FilterSetConfig is given per request as an additional parameter to the config
          }
        }
      }
      return config
    },
  )
  return axios
}

