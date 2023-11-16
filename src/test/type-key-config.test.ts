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

interface FilterSetKeyConfig {
  complex: {
    id: 'in'
  }
  number: 'lt' | 'gt' | 'in'
  text: 'startswith' | 'exact'
}

test('it should accept a KeyConfig', () => {
  const numberArray = [1, 2, 3]
  const config: FilterSetConfig<Data, FilterSetKeyConfig> = {
    number: {
      in: numberArray,
      lt: 5,
    },
  }
  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__in: numberArray, number__lt: 5})
})

test('error when filter key is disallowed in mapping', () => {
  const numberData = {id: 123}
  const config: FilterSetConfig<Data, FilterSetKeyConfig> = {
    number: {
      // @ts-expect-error lte is not allowed
      lte: numberData,
    },
  }
  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({number__lte: numberData})
})

test('should handle nested key configs', () => {
  const numberArray = [1, 2, 3]
  const config: FilterSetConfig<Data, FilterSetKeyConfig> = {
    complex: {
      id: {
        in: numberArray,
      },
    },
  }
  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({complex__id__in: numberArray})
})

test('error when filter key is disallowed in nested mapping', () => {
  const config: FilterSetConfig<Data, FilterSetKeyConfig> = {
    complex: {
      id: {
        // @ts-expect-error lt is not allowed for nested property
        lt: 1,
      },
    },
  }
  const converted = convertFilterSetConfig(config)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({complex__id__lt: 1})
})
