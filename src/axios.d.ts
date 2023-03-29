export * from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    filterSet?: object
  }
}
