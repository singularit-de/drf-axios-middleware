import type {FilterSetConfig} from '../types'
import {convertFilterSetConfig} from '../middleware'

interface ComplexData {
  id: number
}

interface Data {
  complex?: ComplexData
  number?: number
  text?: string
  new?: boolean
}

interface FilterSetMappingCustom {
  data: 'lt' | 'gt' | 'custom1'
  text: 'startswith' | 'exact' | 'custom2'
}

interface CustomFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom1: any[]
  custom2: number
}

test('error when custom filter key is not allowed', () => {
  const config: FilterSetConfig<Data, FilterSetMappingCustom, CustomFilter> = {
    text: {
      // @ts-expect-error custom filter is not allowed
      custom1: '',
    },
  }
  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({text__custom1: ''})
})

test('error when custom has the wrong type', () => {
  const config: FilterSetConfig<Data, FilterSetMappingCustom, CustomFilter> = {
    text: {
      // @ts-expect-error custom filter has wrong type
      custom2: '',
    },
  }
  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({text__custom2: ''})
})

test('error when custom has the wrong type', () => {
  const simpleConfig: FilterSetConfig<Data, FilterSetMappingCustom, CustomFilter> = {
    text: {
      // @ts-expect-error custom filter has wrong type
      custom2: '',
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({text__custom2: ''})
})
