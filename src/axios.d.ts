export * from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    filter?: object
  }
}
