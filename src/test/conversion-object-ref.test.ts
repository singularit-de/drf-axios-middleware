import {convertFilterSetConfig} from '../middleware'
import type {FilterSetConfig} from '../types'

interface NumberData {
  number: number
  noNumber?: Date
}

interface Data {
  data: NumberData
  text?: string
  new?: boolean
}

test('it should convert objects with standard filters', () => {
  const numberData = {number: 123}
  const simpleConfig: FilterSetConfig<Data> = {
    data: {
      lt: numberData,
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({data__lt: numberData})
})

test('it should convert objects with value filters', () => {
  const date = new Date()
  const simpleConfig: FilterSetConfig<Data> = {
    data: {
      number: {value: 123},
      noNumber: {value: date},
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({data__number: 123, data__noNumber: date})
})

test('it should convert complex objects with filters', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    data: {
      number: {lt: 123},
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({data__number__lt: 123})
})

interface FilterSetMapping {
  data: 'lt' | 'gt' | 'custom1'
  text: 'lt' | 'exact'
}

test('it should convert objects with standard filters and a Mapping', () => {
  const numberData = {number: 123}
  const simpleConfig: FilterSetConfig<Data, FilterSetMapping> = {
    data: {
      number: {custom1: 123},
    },
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({data__number__lte: numberData})
})

test('it should convert complex objects with standard filters', () => {
  const simpleConfig: FilterSetConfig<Data> = {
    data: {number: {lt: 123}},
  }
  const converted = convertFilterSetConfig(simpleConfig)
  // eslint-disable-next-line camelcase
  expect(converted).toEqual({data__number__lt: 123, text: 'string'})
})

