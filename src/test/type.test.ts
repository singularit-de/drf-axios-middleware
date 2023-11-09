import type {FilterSetConfig} from '../types'
import {convertFilterSetConfig} from '../middleware'

interface NumberData {
  number: number
  noNumber?: Date
}

interface Data {
  data?: NumberData
  text?: string
  new?: boolean
}

test('Error when type of attribute is passed without filter', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    // @ts-expect-error plain passing is not allowed
    text: 'string',
  }
  expect(() => convertFilterSetConfig(simpleConfig)).toThrow('Cannot use \'in\' operator to search for \'value\' in string')
})

test('Error when attribute is not in data type', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    // @ts-expect-error number is not part of data type
    number: {value: 123},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  expect(converted).toEqual({number: 123})
})

test('Error when unknown filter is used', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    // @ts-expect-error foo is not defined as a filter
    number: {foo: 123},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__foo: 123})
})

test('Error when attribute has the wrong type', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    // @ts-expect-error text is of type string
    text: {value: 123},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  expect(converted).toEqual({text: 123})
})

interface FilterSetMapping {
  data: 'lt' | 'gt'
  text: 'startswith' | 'exact'
}

test('error when filter key is disallowed in mapping', () => {
  const numberData = {number: 123}
  const simpleConfig: FilterSetConfig<Data, FilterSetMapping> = {
    data: {
      // @ts-expect-error lte is not allowed
      lte: numberData,
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({data__lte: numberData})
})

interface CustomFilter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom1: any[]
  custom2: number
}

interface FilterSetMappingCustom {
  data: 'lt' | 'gt' | 'custom1'
  text: 'startswith' | 'exact' | 'custom2'
}

test('error when custom filter key is not allowed', () => {
  const simpleConfig: FilterSetConfig<Data, FilterSetMappingCustom, CustomFilter> = {
    text: {
      // @ts-expect-error custom filter is not allowed
      custom1: '',
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({text__custom1: ''})
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
